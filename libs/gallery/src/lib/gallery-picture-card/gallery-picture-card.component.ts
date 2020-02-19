import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Picture, PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-gallery-picture-card',
  templateUrl: './gallery-picture-card.component.html',
  styleUrls: ['./gallery-picture-card.component.scss']
})
export class GalleryPictureCardComponent implements OnInit {
  @Input() picture: Picture;
  @Input() menu: ElementRef;

  pictureType = PictureType.Gallery;

  constructor() { }

  ngOnInit() {
  }
}
