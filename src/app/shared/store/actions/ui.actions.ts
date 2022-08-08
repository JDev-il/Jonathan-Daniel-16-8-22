import { Action, createAction, props } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loader';
export const STOP_LOADING = '[UI] StopLoader';
export const SHOW_OVERALY = '[UI] ShowOverlay';
export const HIDE_OVERALY = '[UI] HideOverlay';
export const LOGGING_ARRAY = '[UI] LogingArray';

//! just names of action

export class StartLoading implements Action {
  readonly type: string = START_LOADING;
}
export class StopLoading implements Action {
  readonly type: string = STOP_LOADING;
}
export class ShowOverlay implements Action {
  readonly type: string = SHOW_OVERALY;
}
export class HideOverlay implements Action {
  readonly type: string = HIDE_OVERALY;
}
export class LogingArray implements Action {
  readonly type: string = LOGGING_ARRAY;
}

export type UIActions = StartLoading|StopLoading|ShowOverlay|HideOverlay
