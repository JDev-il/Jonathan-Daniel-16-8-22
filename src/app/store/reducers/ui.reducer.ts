import { Action, createFeatureSelector } from '@ngrx/store';
// import { UIActions } from '../actions/ui.actions';

export interface State {
  isLoading?: boolean;
  isOverlay?: boolean
}

const initialState: State = {
  isLoading!: false,
  isOverlay!: false
};


export function uiReducer(state = initialState, action: Action) {
  switch (action) {
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getOverlay = (state: State) => state.isOverlay;
