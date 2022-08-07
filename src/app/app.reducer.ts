import { Action, ActionReducerMap, createFeatureSelector, createReducer, createSelector} from '@ngrx/store'
import * as fromUi from './store/reducers/ui.reducer'
import * as fromItems from './store/reducers/items.reducer'

export interface State {
  UI: fromUi.State,
  ITEMS: fromItems.State
}

export function ItemsReducer(state: fromItems.State) {
    return createReducer(state.isItemDelivered)
}
export function UIReducer(state: fromUi.State) {
  return createReducer(state)
}

// Selector?
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getItemsState = createFeatureSelector<fromItems.State>('items');

// export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)
