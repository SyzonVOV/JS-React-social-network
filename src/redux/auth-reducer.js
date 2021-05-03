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
        ...action.data,
        isAuth: true,
      };

    default:
      return state;
  }

};

const setAuthUserData = (id, email, login = "User") => ({ type: SET_USER_DATA, data: {id, email, login} });

//Thunks creators
export const Thunks = {
  getAuthUserData: () => (dispatch) => {
    authAPI.authMe()
      .then(data => {
        if ( data.resultCode === 0 ) {
          let {id, email, login} = data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      });
  },
  loginUser: (email, password, remember) => (dispatch) => {
    console.log(email, password, remember)
    authAPI.login(email, password, remember)
      .then(data => {
        if ( data.resultCode === 0 ) {
          let {userId} = data.data;
          dispatch(setAuthUserData(userId, email));
        }
      });
  }
}

export default authReducer;