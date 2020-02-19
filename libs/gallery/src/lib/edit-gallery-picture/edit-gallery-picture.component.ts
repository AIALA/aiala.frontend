import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GalleryFacade } from '../+state/gallery.facade';
import { Subscription } from 'libs/gallery/types/rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UpdateAiPictureMetadataModel, UpdateAiPictureTagModel } from '../models/UpdateAiPictureMetadataModel';
import { CanComponentDeactivateBase } from '@msft-aiala/shared';
import { AiPictureTag, Picture, PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-edit-gallery-picture',
  templateUrl: './edit-gallery-picture.component.html',
  styleUrls: ['./edit-gallery-picture.component.scss']
})
export class EditGalleryPictureComponent extends CanComponentDeactivateBase implements OnInit {
  loading$ = this.facade.loading$;
  saving$ = this.facade.saving$;
  picture: Picture;
  form: FormGroup;
  pictureSub: Subscription;
  pictureType = PictureType.Gallery;

  get updatedTags(): FormArray {
    return this.form.controls['updatedTags'] as FormArray;
  }
  get removedTags(): FormArray {
    return this.form.controls['removedTags'] as FormArray;
  }

  constructor(
    private facade: GalleryFacade,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.group({
      description: [''],
      updatedTags: this.formBuilder.array([]),
      removedTags: this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.facade.loadGallery();
    this.pictureSub = combineLatest([
      this.facade.gallery$,
      this.activatedRoute.params
    ]).pipe(
      filter(([pictures, params]) => pictures.length > 0 && params['id'] !== null),
      map(([pictures, params]) => pictures.find(p => p.id === params['id'])),
      filter(place => !!place),
      tap(() => this.form.markAsPristine())
    ).subscribe(picture => {
      this.picture = picture;
      this.form.patchValue({
        description: picture.aiMetadata.description
      });

      this.updatedTags.controls = [];
      this.removedTags.controls = [];
      picture.aiMetadata.tags.sort((a, b) => b.confidence - a.confidence).forEach(t => {
        this.updatedTags.push(this.createTagGroup(t.name, t));
      });
    });
  }

  canDeactivate(): boolean {
    return this.form.pristine;
  }

  onDeleteTag(index: number): void {
    const id = this.updatedTags.controls[index].value['id'];
    if (id !== null) {
      this.removedTags.push(this.formBuilder.control({
        id: id
      }));
    }
    this.updatedTags.removeAt(index);
  }

  onAddTag(): void {
    this.updatedTags.insert(0, this.createTagGroup(''));
  }

  createTagGroup(name: string, tag: AiPictureTag = null): FormGroup {
    return this.formBuilder.group({
      id: [tag ? tag.id : null],
      name: [name, Validators.required],
      tag: [tag]
    });
  }

  save(): void {
    const value = {
      description: this.form.value['description'],
      addedTags: (this.updatedTags.value as UpdateAiPictureTagModel[]).filter(t => t.id === null).map(t => t.name),
      updatedTags: this.updatedTags.controls.filter(c => c.dirty && c.value['id'] !== null).map(c => c.value),
      removedTags: (this.removedTags.value as UpdateAiPictureTagModel[]).map(t => t.id)
    } as UpdateAiPictureMetadataModel;
    this.facade.savePicture(this.picture.id, value);
  }
}
