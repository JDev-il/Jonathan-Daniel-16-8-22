import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import {ItemModel} from '../../../core/interfaces/Item.interface'

@Injectable()
export class ItemsEffect {
  // loadItems$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Items] Items List'),
  //   map(data: ItemModel),
  //   catchError(() => EMPTY)
  //   )
  // );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
