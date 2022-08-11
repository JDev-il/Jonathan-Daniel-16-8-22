import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject } from 'rxjs';
import * as fromRoot from '../../app.reducer'

import * as uiReducer from '../store/actions/ui.actions'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingState?: boolean;

  constructor(private store: Store<fromRoot.State['UI']>) {}


  getStateFromRoot(){
    this.store.dispatch(new uiReducer.HideOverlay())

  }
}
