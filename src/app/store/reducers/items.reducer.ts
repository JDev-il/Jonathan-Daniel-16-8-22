import { Action } from '@ngrx/store';

import { ItemsActions, ITEM_DELIVERED, ITEM_NOT_DELIVERED } from '../actions/items.actions';

export interface State {
  isItemDelivered: boolean;
}

const initialState: State = {
  isItemDelivered: false
};

export function itemsReducer(state = initialState, action: ItemsActions) {
  switch (action.type) {
    case ITEM_DELIVERED:
      return true;

    case ITEM_NOT_DELIVERED:
      return false;

    default:
      return state;
  }
}

export const getIsItemDelivered = (state: State) => state.isItemDelivered
