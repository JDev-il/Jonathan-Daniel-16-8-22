import { Action, createAction, props } from '@ngrx/store';
import { ItemModel } from 'src/app/core/interfaces/Item.interface';

// export const ITEM_DELIVERED = '[items] Item Delivered';
// export const ITEM_NOT_DELIVERED = '[items] Item Not Delivered';
// export const ADD_NEW_ITEM = '[items] Add New Item';
// export const ARCHIVE_ITEM = '[items] Archive Item';
// export const REACTIVATE_ITEM = '[items] Reactivate Item';

// export const ITEMS_LIST = '[Items] Get All Items'



export const loadItemsSuccess = createAction('[Items List] Load Items Success', props<{items: ItemModel[]}>());


export const FETCHING_ITEMS = "FETCHING_ITEMS";
export const ITEMS_FETCH_SUCCESSFUL = "ITEMS_FETCH_SUCCESSFUL";
export const ERROR_FETCHING_ITEMS = "ERROR_FETCHING_USERS";

export const itemsFetchSuccessful = (items: ItemModel[]) => ({
  type: ITEMS_FETCH_SUCCESSFUL,
  payload: items
});
export const fetchError = (error: Error) => ({
  type: ERROR_FETCHING_ITEMS,
  payload: error
});

export const ItemsActions = () => ({ type: FETCHING_ITEMS });


// export class ItemDelivered implements Action {
//   readonly type = ITEM_DELIVERED;
// }
// export class ItemNotDelivered implements Action {
//   readonly type = ITEM_NOT_DELIVERED;
// }
// export class AddNewItem implements Action {
//   readonly type = ADD_NEW_ITEM;
// }
// export class ArchiveItem implements Action {
//   readonly type = ARCHIVE_ITEM;
// }
// export class ReActivateItem implements Action {
//   readonly type = REACTIVATE_ITEM;
// }
// export class ItemsList implements Action {
//   readonly type = ITEMS_LIST;
// }


// export type ItemsActions = ItemDelivered|ItemNotDelivered|AddNewItem|ArchiveItem|ReActivateItem|ItemsList
