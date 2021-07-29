import {authAPI, EResultCodes, securityAPI} from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET_CAPTCHA_SUCCESS';

export type InitStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetching: boolean,
    captchaUrl: string | null,
}

let initialState: InitStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null,
};


const authReducer = (state = initialState, action: any): InitStateType => {

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

type TSetAuthUserDataPayload = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}
// Actions types -->
type TSetAuthUserData = {
    type: typeof SET_USER_DATA,
    payload: TSetAuthUserDataPayload
}

type TSetCaptchaUrl = {
    type: typeof GET_CAPTCHA_SUCCESS,
    payload: string
}
// Actions types <--

const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): TSetAuthUserData => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
});
const setCaptchaUrl = (url: string): TSetCaptchaUrl => ({type: GET_CAPTCHA_SUCCESS, payload: url});

//Thunks creators
export const Thunks = {
    getAuthUserData: () => (dispatch: any) => {
        return authAPI.authMe()
            .then(data => {
                if (data.resultCode === EResultCodes.Success) {
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
    },
    loginUser: (email: string, password: string, remember: boolean) => (dispatch: any) => {
        authAPI.login(email, password, remember)
            .then(data => {
                if (data.resultCode === EResultCodes.Success) {
                    dispatch(Thunks.getAuthUserData()) ;
                } else if (data.resultCode === EResultCodes.Captcha) {
                    dispatch(Thunks.getCaptcha());
                }
            });
    },
    logoutUser: () => (dispatch: any) => {
        authAPI.logout()
            .then(data => {
                if (data.resultCode === EResultCodes.Success ) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
    },
    getCaptcha: () => (dispatch: any) => {
        securityAPI.getCaptchaUrl()
            .then(data => {
                dispatch(setCaptchaUrl(data.url));
            });
    },
};
export default authReducer;