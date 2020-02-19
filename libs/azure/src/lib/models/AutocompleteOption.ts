import * as atlas from 'azure-maps-control';
import * as atlasService from 'azure-maps-rest';
import { SearchResultType } from './SearchResultType';

export class AutocompleteOption {
  mainLine: string;
  subLine: string;
  position: atlas.data.Position;

  public static fromSearchFuzzyResult(result: atlasService.Models.SearchFuzzyResult) {
    const value = new AutocompleteOption();
    value.position = [result.position.lon, result.position.lat];

    const addressOneliner = `${result.address.freeformAddress}, ${result.address.country}`;

    if (result.type === SearchResultType.POI) {
      value.mainLine = result.poi.name;
      value.subLine = addressOneliner;
    } else {
      value.mainLine = addressOneliner;
    }

    if (result.type === SearchResultType.AddressRange) {
      value.subLine = `${result.addressRanges.from} - ${result.addressRanges.to}`
    }

    return value;
  }
}
