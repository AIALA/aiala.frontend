import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Place } from '../models/Place';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;
  @Input() menu: ElementRef;

  pictureType = PictureType.PlacePictures;

  constructor() { }

  ngOnInit() {
  }

}
