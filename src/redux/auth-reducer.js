import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
};


const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case GET_CAPTCHA_SUCCESS:
      return {
        ...state,
        captchaUrl: action.payload,
      };

    default:
      return state;
  }

};

const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });
const setCaptchaUrl = (url) => ({ type: GET_CAPTCHA_SUCCESS, payload: url });

//Thunks creators
export const Thunks = {
  getAuthUserData: () => (dispatch) => {
    return authAPI.authMe()
      .then(data => {
        if ( data.resultCode === 0 ) {
          let { id, email, login } = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      });
  },
  loginUser: (email, password, remember) => (dispatch) => {
    authAPI.login(email, password, remember)
      .then(data => {
        if ( data.resultCode === 0 ) {
          dispatch(Thunks.getAuthUserData());
        } else if ( data.resultCode === 10 ) {
          dispatch(Thunks.getCaptcha());
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
  },
  getCaptcha: () => (dispatch) => {
    securityAPI.getCaptchaUrl()
      .then(data => {
        dispatch(setCaptchaUrl(data.url));
      });
  },
};
export default authReducer;