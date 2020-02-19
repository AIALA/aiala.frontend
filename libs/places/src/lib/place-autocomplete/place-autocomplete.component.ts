import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Place } from '../models/Place';
import { PlacesFacade } from '../+state/places.facade';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})
export class PlaceAutocompleteComponent implements OnInit, OnDestroy {
  places$ = this.facade.places$;

  @Input() placeholder: string;
  @Input() appFormGroup: FormGroup;
  @Input() referenceControlName: string;
  @Input() freeFormControlName: string;

  incomingChangesSub: Subscription;
  outgoingChangesSub: Subscription;

  options$: Observable<Place[]>;
  form: FormGroup;
  displayOption = this._displayOption.bind(this);

  private get place(): FormControl {
    return this.form.controls['place'] as FormControl;
  }

  private get freeFormControl(): FormControl {
    return this.appFormGroup.controls[this.freeFormControlName] as FormControl;
  }

  private get referenceControl(): FormControl {
    return this.appFormGroup.controls[this.referenceControlName] as FormControl;
  }

  constructor(
    private facade: PlacesFacade,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      place: ['']
    });
  }

  ngOnInit() {
    this.facade.loadPlaces();

    this.options$ = combineLatest([
      this.facade.places$,
      this.place.valueChanges
    ]).pipe(
      filter(([places, _]) => !!places),
      map(([places, place]) => {
        return [places, (this.isStringOrEmpty(place) ? place : (place as Place).name)] as [Place[], string | Place];
      }),
      map(([places, place]) => {
        if (place) {
          const placeName = this.isStringOrEmpty(place) ? (place as string).toLowerCase() : (place as Place).name;
          return places.sort((a, b) => {
            const indexA = a.name.toLowerCase().indexOf(placeName);
            const indexB = b.name.toLowerCase().indexOf(placeName);

            if (indexA >= 0 && indexB >= 0) {
              return indexA - indexB;
            }
            if (indexA >= 0) {
              return -1;
            }
            if (indexB >= 0) {
              return 1;
            }

            return a.name.localeCompare(b.name);
          }).slice(0, 5);
        } else {
          return places.sort();
        }
      })
    );

    this.incomingChangesSub = combineLatest([
      this.freeFormControl.valueChanges,
      this.referenceControl.valueChanges
    ]).subscribe(() => this.applyToLocalForm());
    this.outgoingChangesSub = this.place.valueChanges.subscribe(() => this.applyToParentForm());
  }

  ngOnDestroy(): void {
    if (this.incomingChangesSub) {
      this.incomingChangesSub.unsubscribe();
    }
    if (this.outgoingChangesSub) {
      this.outgoingChangesSub.unsubscribe();
    }
  }

  private _displayOption(place: Place | string) : string {
    return this.isStringOrEmpty(place) ? (place as string) || '' : (place as Place).name;
  }

  private applyToLocalForm(): void {
    let value = this.referenceControl.value;

    if (value) {
      if (this.isStringOrEmpty(this.place.value)) {
        this.facade.places$.pipe(
          filter(places => places && places.length > 0),
          take(1)
        ).subscribe(places => {
          this.place.setValue(places.find(p => p.id === value));
        });
        return;
      }

      if (value !== (this.place.value as Place).id) {
        this.place.setValue(value);
      }
      return;
    }

    value = this.freeFormControl.value;
    if (value !== this.place.value) {
      this.place.setValue(value);
    }
  }

  private applyToParentForm(): void {
    const value = this.place.value;

    if (this.isStringOrEmpty(value)) {
      if (value !== this.freeFormControl.value) {
        this.freeFormControl.setValue(value);
        this.referenceControl.setValue(undefined);
        this.appFormGroup.markAsDirty();
      }
    } else {
      if (!(this.referenceControl.value) || value !== this.referenceControl.value) {
        this.referenceControl.setValue(value.id);
        this.freeFormControl.setValue(undefined);
        this.appFormGroup.markAsDirty();
      }
    }
  }

  private isStringOrEmpty(value: any): boolean {
    return !value || typeof value === 'string';
  }
}
