import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

import { Item } from 'src/app/core/interfaces/Item.interface';

import { Store } from '@ngrx/store';
//Store Reducers
import * as fromRoot from '../../app.reducer';
//Store Actions
import * as UI from '../store/actions/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(
    private apiService: ApiService,
    private store: Store<fromRoot.State>) {
  }

  // items = this.store.select(fromRoot.getItems);


  addNewItemToDeliveryList(newItem?: Item){
    this.store.dispatch(new UI.StartLoading());
    // this.items.find(prevItem=>{
    //   if(prevItem.title === newItem.title && prevItem.price === newItem.price && !prevItem.isDelivered){
    //   }
    // })
    // this.store.dispatch(new UI.StopLoading());
  }

  archiveDeliveryItem(itemToArchive: Item){
    // this.store.dispatch(new UI.StartLoading());
    /*
    TODO --> item should be removed from delivery items list >> and add it to the archived list.
    */
    // this.store.dispatch(new UI.StopLoading());
  }


  reactivateItem(itemToReactivate: Item){
    /*
    TODO --> reactivate item means to send item back to delivery list - and remove from archive list.
    */
  }

}
