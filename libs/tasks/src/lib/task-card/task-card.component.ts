import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Task } from '../models/Task';
import { PictureType } from '@msft-aiala/picture';

@Component({
  selector: 'msft-aiala-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  @Input() menu: ElementRef;

  pictureType = PictureType.TaskPictures;

  constructor() { }

  ngOnInit() {
  }

}
