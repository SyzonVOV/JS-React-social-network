import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};


const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }

};

const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {id, email, login, isAuth} });

//Thunks creators
export const Thunks = {
  getAuthUserData: () => (dispatch) => {
    authAPI.authMe()
      .then(data => {
        if ( data.resultCode === 0 ) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      });
  },
  loginUser: (email, password, remember) => (dispatch) => {
    authAPI.login(email, password, remember)
      .then(data => {
        if ( data.resultCode === 0 ) {
          dispatch(Thunks.getAuthUserData());
        }
      });
  },
  logoutUser: () => (dispatch) => {
    authAPI.logout()
      .then(data => {
        if ( data.resultCode === 0 ) {
          dispatch(setAuthUserData(null, null, null, false));
        }
      });
  }
}

export default authReducer;