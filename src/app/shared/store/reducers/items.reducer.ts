import { OriginalItem } from 'src/app/core/interfaces/Item.interface';
import { ADD_NEW_ITEM, ARCHIVE_ITEM, ITEM_DELIVERED, ITEM_NOT_DELIVERED, REACTIVATE_ITEM, ItemsActions } from '../actions/items.actions';

export interface State {
  itemDelivered: boolean;
  itemsList: OriginalItem[];
  newItems: OriginalItem[];
  archiveItem: OriginalItem;
  reActivateItem: OriginalItem;
}

const initialState: State = {
  itemDelivered: false,
  itemsList: [],
  newItems: [],
  archiveItem: <OriginalItem>{},
  reActivateItem: <OriginalItem>{},
};

export function reducerItems(state = initialState, action: ItemsActions) {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return { itemDelivered: true };
    case ARCHIVE_ITEM:
      return { archiveItem: true };
    case REACTIVATE_ITEM:
      return { archiveItem: false }
    case ITEM_DELIVERED:
      return { itemDelivered: true }
    case ITEM_NOT_DELIVERED:
      return { itemDelivered: false }
    default: {
      return state;
    }
  }
}

//Slices of updated state
export const
getAddedItems = (state: State) => state.newItems,
getArchivedItems = (state: State) => state.archiveItem;
