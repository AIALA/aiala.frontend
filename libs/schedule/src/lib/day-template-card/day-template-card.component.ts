import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DayTemplate } from '../models/DayTemplate';

@Component({
  selector: 'msft-aiala-day-template-card',
  templateUrl: './day-template-card.component.html',
  styleUrls: ['./day-template-card.component.scss']
})
export class DayTemplateCardComponent implements OnInit {
  @Input() dayTemplate: DayTemplate;

  @Input() menu: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
