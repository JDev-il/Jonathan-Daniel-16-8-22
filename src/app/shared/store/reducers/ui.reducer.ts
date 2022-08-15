import {START_LOADING, STOP_LOADING, SHOW_OVERALY, HIDE_OVERALY, UIActions} from '../actions/ui.actions';

export interface State {
  isLoading?: boolean;
  isOverlay?: boolean;
}

const initialState: State = {
  isLoading: false,
  isOverlay: true,
};

export function reducerUi(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };
    case STOP_LOADING:
      return { isLoading: false};
    case SHOW_OVERALY:
      return { isOverlay: true};
    case HIDE_OVERALY:
      return { isOverlay: false};
    default: {
      return state;
    }
  }
}

//Slices of updated state
export const
getIsLoadingState = (state: State) => state.isLoading,
getOverlayState = (state: State) => state.isOverlay;

