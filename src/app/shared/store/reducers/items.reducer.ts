import { ItemModel } from 'src/app/core/interfaces/Item.interface';
import { ActionReducerMap, InitialState } from "@ngrx/store/src/models";

// import { ADD_NEW_ITEM, ARCHIVE_ITEM, ITEM_DELIVERED, ITEM_NOT_DELIVERED, REACTIVATE_ITEM, ITEMS_LIST, ItemsActions, ItemsList } from '../actions/items.actions';
import { ITEMS_FETCH_SUCCESSFUL, FETCHING_ITEMS, ERROR_FETCHING_ITEMS, ItemsActions } from '../actions/items.actions';
import { Action } from '@ngrx/store';

const initialState = {
  loading: false,
  list: [],
  error: void 0
};
export interface ItemsState {
  loading: boolean;
    list: Array<ItemModel>;
    error: string;
}

export interface FeatureItems {
  items: ItemsState | any;
}

export const ItemsReducer: ActionReducerMap<FeatureItems, Action> = {
  items: itemsReducer
};


export function itemsReducer(state = initialState, action: any) {
  switch (action.type) {
      case ITEMS_FETCH_SUCCESSFUL:
          return { ...state, list: action.payload, loading: false };
      case ERROR_FETCHING_ITEMS:
          return { ...state, error: action.payload, loading: false };
      case FETCHING_ITEMS:
          return { ...state, loading: true };
      default:
          return state;
  }
}

// export function reducerItems(state = initialState, action: ItemsActions) {
//   switch (action.type) {
//     case ADD_NEW_ITEM:
//       return { itemDelivered: true };
//     case ARCHIVE_ITEM:
//       return { archiveItem: true };
//     case REACTIVATE_ITEM:
//       return { archiveItem: false }
//     case ITEM_DELIVERED:
//       return { itemDelivered: true }
//     case ITEM_NOT_DELIVERED:
//       return { itemDelivered: false }
//     case ITEMS_LIST:
//       return { itemsList: [...state.itemsList, ITEMS_LIST]}
//     default: {
//       return state;
//     }
//   }
// }

// //Slices of updated state
// export const
// getAddedItems = (state: State) => state.newItems,
// getArchivedItems = (state: State) => state.archiveItem,
// getItemsList = (state: State) => state.itemsList;
