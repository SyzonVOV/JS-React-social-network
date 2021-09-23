import { Thunks as authThunks } from './auth-reducer';
import { ActionsTypes } from './redux-store';

const SET_INITIALIZED = 'app/SET_INITIALIZED';

export type InitStateType = typeof initialState;
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

type ActionType = ActionsTypes<typeof actions>
const actions ={setInitialized: () => ({ type: SET_INITIALIZED} as const)}

//Thunks creators
export const Thunks = {
  getInitializeApp: () => (dispatch: any) => {
    let promise = dispatch(authThunks.getAuthUserData());
    promise.then(() => {
      dispatch(actions.setInitialized());
    })
  },
}

export default appReducer;