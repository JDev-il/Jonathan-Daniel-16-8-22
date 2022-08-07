import { Action, createAction } from '@ngrx/store';


//? OPTION 1:
  // export enum ActionTypes {
  //   START_LOADING = '[UI] StartLoader',
  //   STOP_LOADING = '[UI] StopLoader',
  //   SHOW_OVERALY = '[UI] ShowOverlay'
  // }

  // export class StartLoading implements Action {
  //   readonly type = ActionTypes.START_LOADING;
  //   constructor(public payload: {}) {}
  // }


//? OPTION 2:

export const startLoader = createAction('START_LOADER');
export const stopLoader = createAction('STOP_LOADER');
export const showOverlay = createAction('SHOW_OVERLAY');
export const stopOverlay = createAction('STOP_OVERLAY');
