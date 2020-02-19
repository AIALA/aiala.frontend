import { Component, Inject, Input, OnDestroy, ViewChild, ElementRef, Output, AfterViewInit } from '@angular/core';
import * as atlas from 'azure-maps-control';
import * as atlasService from 'azure-maps-rest';
import { AZURE_API_KEY_LOADER_TOKEN } from '../tokens';
import { Observable, Subscription, Subject, merge, from } from 'rxjs';
import { MapCoordinates } from '../models/MapCoordinates';
import { map, switchMap, debounceTime, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutocompleteOption } from '../models/AutocompleteOption';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { AutocompleteFormValue } from '../models/AutocompleteFormValue';

@Component({
  selector: 'msft-aiala-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements AfterViewInit, OnDestroy {
  private static readonly initialZoom = 16;

  @ViewChild('infoWindowContent') infoWindowContentRef: ElementRef<any>;
  @ViewChild('savedChangesMarker') savedChangesMarkerRef: ElementRef<any>;
  @ViewChild('unsavedChangesMarker') unsavedChangesMarkerRef: ElementRef<any>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  @Input() centerOnSelection$: Observable<unknown>;
  @Input() showCurrentLocation$: Observable<boolean>;
  @Input() loadedCoordinates$: Observable<MapCoordinates>;
  @Output() coordinatesChange: Subject<MapCoordinates> = new Subject<MapCoordinates>();

  options$: Observable<AutocompleteOption[]>;
  coordinatesSub: Subscription;
  apiKeySub: Subscription;
  showCurrentLocationSub: Subscription;
  centerOnSelectionSub: Subscription;

  map: atlas.Map;
  credentials: atlasService.SubscriptionKeyCredential;
  marker: atlas.HtmlMarker;
  contextMenu: atlas.Popup;
  panCameraOptions: (atlas.CameraOptions & atlas.AnimationOptions) | (atlas.CameraBoundsOptions & atlas.AnimationOptions) = {
    type: 'ease',
    duration: 300
  };
  autocompleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(AZURE_API_KEY_LOADER_TOKEN) private apiKey$: Observable<string>
  ) {
    this.autocompleteForm = this.formBuilder.group({
      search: [''],
      searchNear: [true]
    });
  }

  ngAfterViewInit() {
    if (!document.getElementById('azure-map')) {
      setTimeout(this.ngAfterViewInit.bind(this), 50);
      console.log('Delaying ngAfterViewInit, waiting for azure maps container');
      return;
    }

    this.apiKeySub = this.apiKey$.subscribe(apiKey => {
      this.credentials = new atlasService.SubscriptionKeyCredential(apiKey);
      this.map = new atlas.Map('azure-map', {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: apiKey
        },
        center: [8.226692, 46.80121],
        zoom: 6.5
      });
      this.map.events.add('ready', () => {
        const compassControl = new atlas.control.CompassControl();
        this.map.controls.add(compassControl, {
          position: atlas.ControlPosition.BottomRight
        });

        const pitchControl = new atlas.control.PitchControl();
        this.map.controls.add(pitchControl, {
          position: atlas.ControlPosition.BottomRight
        });

        const zoomControl = new atlas.control.ZoomControl();
        this.map.controls.add(zoomControl, {
          position: atlas.ControlPosition.BottomRight
        });

        const styleControl = new atlas.control.StyleControl();
        this.map.controls.add(styleControl, {
          position: atlas.ControlPosition.BottomRight
        });

        this.initCoordinatesSub();
        this.initContextMenu();
        this.initAutocomplete();

        this.showCurrentLocationSub = this.showCurrentLocation$.subscribe(showPopup => {
            this.showCurrentLocation(showPopup);
        });
        this.centerOnSelectionSub = this.centerOnSelection$.subscribe(() => {
          this.map.setCamera({
            ...this.panCameraOptions,
            center: this.marker.getOptions().position,
            zoom: MapSelectorComponent.initialZoom
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.coordinatesSub) {
      this.coordinatesSub.unsubscribe();
    }
    if (this.apiKeySub) {
      this.apiKeySub.unsubscribe();
    }
    if (this.showCurrentLocationSub) {
      this.showCurrentLocationSub.unsubscribe();
    }
    if (this.centerOnSelectionSub) {
      this.centerOnSelectionSub.unsubscribe();
    }
  }

  closeInfoWindow(): void {
    this.contextMenu.close();
  }

  selectLocation(): void {
    this.contextMenu.close();
    this.coordinatesChange.next(this.toCoordinates(this.contextMenu.getOptions().position));
  }

  displayAutocomplete(value: AutocompleteOption | string): string {
    if (!value || typeof value === 'string') {
      return value as string;
    }

    return (value as AutocompleteOption).mainLine;
  }

  autocompleteSelected(option: MatAutocompleteSelectedEvent): void {
    this.coordinatesChange.next(this.toCoordinates((option.option.value as AutocompleteOption).position));
  }

  showAutocomplete(): void {
    this.autocomplete.openPanel();
  }

  private initCoordinatesSub(): void {
    this.coordinatesSub = merge(
      this.loadedCoordinates$.pipe(map(coordinates => [coordinates, true] as [MapCoordinates, boolean])),
      this.coordinatesChange.pipe(map(coordinates => [coordinates, false] as [MapCoordinates, boolean]))
    ).subscribe(([coordinates, isLoaded]) => {
      const position = this.toPosition(coordinates);
      const cameraOptions = {
        center: position
      } as (atlas.CameraOptions | atlas.CameraBoundsOptions) & atlas.AnimationOptions;

      if (!this.marker) {
        this.marker = new atlas.HtmlMarker({
          htmlContent: this.savedChangesMarkerRef.nativeElement,
          position,
          color: '#1286a2'
        });
        this.map.markers.add(this.marker);
        cameraOptions.zoom = MapSelectorComponent.initialZoom;
      } else {
        this.marker.setOptions({
          htmlContent: isLoaded ? this.savedChangesMarkerRef.nativeElement : this.unsavedChangesMarkerRef.nativeElement,
          position
        });
      }

      this.map.setCamera(cameraOptions);

      const formValue = this.autocompleteForm.value as AutocompleteFormValue;
      if (formValue) {
        if (typeof formValue.search === 'string'
          || formValue.search.position[0] !== coordinates.longitude
          || formValue.search.position[1] !== coordinates.latitude) {
          this.autocompleteForm.patchValue({
            search: ''
          });
        }
      }
    });
  }

  private initAutocomplete(): void {
    this.options$ = this.autocompleteForm.valueChanges.pipe(
      debounceTime(500),
      map(value => value as unknown as AutocompleteFormValue),
      filter((value: AutocompleteFormValue) => typeof value.search === 'string' && value.search.length > 0),
      switchMap((value: AutocompleteFormValue) => {
        const pipeline = atlasService.MapsURL.newPipeline(this.credentials);
        const searchUrl = new atlasService.SearchURL(pipeline);
        const params = {
          limit: 10
        } as atlasService.Models.SearchGetSearchFuzzyOptionalParams;
        if (value.searchNear && this.marker) {
          const position = this.marker.getOptions().position;
          params.lon = position[0];
          params.lat = position[1];
          // params.radius = 1000;
        }
        return from(searchUrl.searchFuzzy(atlasService.Aborter.timeout(10000), value.search as string, params));
      }),
      map((results: atlasService.WithGeojson<atlasService.Models.SearchGetSearchFuzzyResponse, atlasService.SearchGeojson>) => {
        if (!results) {
          return [];
        }

        const fuzzyResults = results.results;
        return fuzzyResults.map(r => AutocompleteOption.fromSearchFuzzyResult(r));
      })
    );
  }

  private initContextMenu(): void {
    this.contextMenu = new atlas.Popup({
      content: this.infoWindowContentRef.nativeElement
    });

    this.map.events.add('click', this.onClick.bind(this));
    this.map.events.add('contextmenu', this.onClick.bind(this));
  }

  private onClick(e: atlas.MapMouseEvent): void {
    if (this.contextMenu.isOpen()) {
      this.contextMenu.close();
    } else {
      this.openContextMenu(e.position);
    }
  }

  private openContextMenu(position: atlas.data.Position): void {
    this.contextMenu.setOptions({
      position
    });
    this.contextMenu.open(this.map);
    this.map.setCamera({
      ...this.panCameraOptions,
      center: position
    });
  }

  private showCurrentLocation(showPopup: boolean): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        if (showPopup) {
          this.openContextMenu(this.toPosition(coordinates));
        } else {
          this.coordinatesChange.next(coordinates);
        }
      });
    }
  }

  private toPosition(coordinates: MapCoordinates): atlas.data.Position {
    return atlas.data.Position.fromLatLng(coordinates.longitude, coordinates.latitude);
  }

  private toCoordinates(position: atlas.data.Position): MapCoordinates {
    return {
      longitude: position[0],
      latitude: position[1]
    };
  }
}
