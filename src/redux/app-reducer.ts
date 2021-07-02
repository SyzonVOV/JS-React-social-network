import { Thunks as authThunks } from './auth-reducer';

const SET_INITIALIZED = 'app/SET_INITIALIZED';

export type InitStateType = typeof initialState;

type ActionType =
  | {type: typeof SET_INITIALIZED}

let initialState = {
  initialized: false
};


const appReducer = (state:InitStateType = initialState, action: ActionType): InitStateType => {

  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }

};

const setInitialized = () => ({ type: SET_INITIALIZED});

//Thunks creators
export const Thunks = {
  getInitializeApp: () => (dispatch: any) => {
    let promise = dispatch(authThunks.getAuthUserData());
    promise.then(() => {
      dispatch(setInitialized());
    })
  },
}

export default appReducer;