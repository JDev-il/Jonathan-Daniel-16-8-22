import { Action, createAction } from '@ngrx/store';
import { Item } from 'src/app/core/interfaces/Item.interface';

//? OPTION 1:

// export const ITEM_DELIVERED = '[items] Item Delivered';
// export const ITEM_NOT_DELIVERED = '[items] Item Not Delivered';

// export class ItemDelivered implements Action {
//   readonly type = ITEM_DELIVERED;
// }

// export class ItemNotDelivered implements Action {
//   readonly type = ITEM_NOT_DELIVERED;
// }

// export type ItemsActions = ItemDelivered | ItemNotDelivered;


//? OPTION 2:
export const addItem = createAction('ADD_ITEM');
export const archiveItem = createAction('ARCHIVE_ITEM');
export const reactivateItem = createAction('REACTIVATE_ITEM');
