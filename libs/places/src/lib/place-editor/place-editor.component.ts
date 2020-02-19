import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlacesFacade } from '../+state/places.facade';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { Place } from '../models/Place';
import { MapCoordinates } from '@msft-aiala/azure';
import { CanComponentDeactivateBase } from '@msft-aiala/shared';
import { Picture, PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-place-editor',
  templateUrl: './place-editor.component.html',
  styleUrls: ['./place-editor.component.scss']
})
export class PlaceEditorComponent extends CanComponentDeactivateBase implements OnInit, OnDestroy {
  saving$ = this.facade.saving$;
  loading$ = this.facade.loading$;
  pictureUrl$: ReplaySubject<string> = new ReplaySubject<string>(1);
  loadedCoordinates$: ReplaySubject<MapCoordinates> = new ReplaySubject<MapCoordinates>(1);
  centerOnSelection$: Subject<unknown> = new Subject<unknown>();
  showCurrentLocation$: Subject<boolean> = new ReplaySubject<boolean>(1);

  form: FormGroup;
  title = 'New Place';
  placeSub: Subscription;
  idSub: Subscription;
  pictureUrlSub: Subscription;
  pictureType = PictureType.PlacePictures;

  get picture(): FormGroup {
    return this.form.controls['picture'] as FormGroup;
  }

  constructor(
    private facade: PlacesFacade,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.createForms();
    this.pictureUrlSub = this.picture.controls['pictureUrl'].valueChanges.subscribe(value => this.pictureUrl$.next(value));
  }

  ngOnInit() {
    this.idSub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.facade.loadPlaces();
        this.placeSub = this.facade.places$.pipe(
          map(places => places.find(p => p.id === id)),
          filter(place => !!place),
          tap(() => this.form.markAsPristine())
        ).subscribe(place => {
          this.title = place.name;
          this.form.patchValue(place);
          this.loadedCoordinates$.next({
            latitude: place.latitude,
            longitude: place.longitude
          });
          this.form.markAsPristine();
        });
      } else {
        this.showCurrentLocation$.next(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
    if (this.pictureUrlSub) {
      this.pictureUrlSub.unsubscribe();
    }
  }

  save(): void {
    this.facade.savePlace(this.form.value);
  }

  savePicture(picture: Picture): void {
    this.form.patchValue({
      picture: picture
    } as Partial<Place>);
    this.picture.markAsDirty();
  }

  onCoordinatesChange(coordinates: MapCoordinates): void {
    // If it is the first time setting the coordinates, it most likely is the auto center
    // Do not mark dirty in that case to prevent unneccessary popups
    if ((this.form.value as Place).latitude) {
      this.form.markAsDirty();
    }
    this.form.patchValue(coordinates);
  }

  canDeactivate(): boolean {
    return this.form.pristine;
  }

  private createForms(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      picture: this.formBuilder.group({
        id: [''],
        pictureUrl: ['']
      }),
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }
}
