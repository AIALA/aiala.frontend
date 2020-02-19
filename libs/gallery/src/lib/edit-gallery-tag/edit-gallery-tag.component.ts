import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AiPictureTag } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-edit-gallery-tag',
  templateUrl: './edit-gallery-tag.component.html',
  styleUrls: ['./edit-gallery-tag.component.scss']
})
export class EditGalleryTagComponent implements OnInit {
  @Input() tagFormGroup: FormGroup;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  tag: AiPictureTag;

  constructor() { }

  ngOnInit() {
    this.tag = this.tagFormGroup.controls['tag'].value;
  }
}
