import { Component, OnInit, Input } from '@angular/core';
import { PlacesFacade } from '../+state/places.facade';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'msft-aiala-place-selector',
  templateUrl: './place-selector.component.html',
  styleUrls: ['./place-selector.component.scss']
})
export class PlaceSelectorComponent implements OnInit {
  places$ = this.facade.places$;

  @Input() placeholder: string;
  @Input() appFormGroup: FormGroup;
  @Input() appFormControlName: string;

  constructor(
    private facade: PlacesFacade
  ) { }

  ngOnInit() {
    this.facade.loadPlaces();
  }
}
