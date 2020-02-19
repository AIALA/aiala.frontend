import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PlacesPartialState } from './places.reducer';
import { Observable } from 'rxjs';
import { Place } from '../models/Place';
import { GetPlacesAction, SavePlaceAction, DeletePlaceAction } from './places.actions';
import { placesQuery } from './places.selectors';

@Injectable()
export class PlacesFacade {
  places$: Observable<Place[]> = this.store.pipe(select(placesQuery.getPlaces));
  loading$: Observable<boolean> = this.store.pipe(select(placesQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(placesQuery.getSaving));

  constructor(
    private store: Store<PlacesPartialState>
  ) { }

  loadPlaces(): void {
    this.store.dispatch(new GetPlacesAction());
  }

  savePlace(place: Place): void {
    this.store.dispatch(new SavePlaceAction(place));
  }

  deletePlace(id: string): void {
    this.store.dispatch(new DeletePlaceAction(id));
  }
}
