import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer'
import * as uiReducer from '../store/actions/ui.actions'

@Injectable({
  providedIn: 'root',
})
export class UiService {

  loadingState: Observable<any> = this.store.select(fromRoot.getIsLoading);

  constructor(private store: Store<fromRoot.State>) {}
}
