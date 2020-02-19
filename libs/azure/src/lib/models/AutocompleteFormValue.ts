import { AutocompleteOption } from './AutocompleteOption';

export interface AutocompleteFormValue {
  search: string | AutocompleteOption;
  searchNear: boolean;
}
