import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

import { Item } from 'src/app/core/interfaces/Item.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private apiService: ApiService) {
  }

  items: Item[] = this.apiService.items;


  addNewItemToDeliveryList(newItem: Item){
    // this.items.find(prevItem=>{
    //   if(prevItem.title === newItem.title && prevItem.price === newItem.price && !prevItem.isDelivered){
    //   }
    // })
    /*
    TODO --> check if incoming item exists in items list (using 'find')
    //* if not, insert the new item
    */
  }

  archiveDeliveryItem(itemToArchive: Item){
    /*
    TODO --> item should be removed from delivery items list >> and add it to the archived list.
    */
  }


  reactivateItem(itemToReactivate: Item){
    /*
    TODO --> reactivate item means to send item back to delivery list - and remove from archive list.
    */
  }

}
