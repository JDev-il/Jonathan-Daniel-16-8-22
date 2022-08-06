//->Change Later //->Change Later //->Change Later

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        isLoading: false,
      };

    default:
      return state;
  }
}
