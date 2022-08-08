import {  ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromUi from './shared/store/reducers/ui.reducer'
import * as fromItems from './shared/store/reducers/items.reducer'

// Selector State Slices
export const getUiState = createFeatureSelector<fromUi.State>('UI');
export const getItemsState = createFeatureSelector<fromItems.State>('Items');

export interface State {
  UI?: fromItems.State;
}

export const reducers: ActionReducerMap<any> = {
  UI: fromUi.reducerUi,
}


// Selector State Export
export const
getIsLoading = createSelector(getUiState, fromUi.getIsLoadingState),
getOverlay = createSelector(getUiState, fromUi.getOverlayState),
addedItems = createSelector(getItemsState, fromItems.getAddedItems),
archivedItems = createSelector(getItemsState, fromItems.getArchivedItems)



