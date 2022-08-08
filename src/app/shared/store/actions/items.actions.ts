import { Action } from '@ngrx/store';

export const ITEM_DELIVERED = '[items] Item Delivered';
export const ITEM_NOT_DELIVERED = '[items] Item Not Delivered';
export const ADD_NEW_ITEM = '[items] Add New Item';
export const ARCHIVE_ITEM = '[items] Archive Item';
export const REACTIVATE_ITEM = '[items] Reactivate Item';

export class ItemDelivered implements Action {
  readonly type = ITEM_DELIVERED;
}
export class ItemNotDelivered implements Action {
  readonly type = ITEM_NOT_DELIVERED;
}
export class AddNewItem implements Action {
  readonly type = ADD_NEW_ITEM;
}
export class ArchiveItem implements Action {
  readonly type = ARCHIVE_ITEM;
}
export class ReActivateItem implements Action {
  readonly type = REACTIVATE_ITEM;
}


export type ItemsActions = ItemDelivered|ItemNotDelivered|AddNewItem|ArchiveItem|ReActivateItem
