import {profileAPI} from '../api/api';
import Volodymyr from '../assets/images/Volodymyr_the_Great.jpg';
import {TPhoto, TPost, TProfile } from '../types';
import {objIterationWithReplacement} from '../utils/helpers';

const APP_POST = 'prof/APP-POST';
const DEL_POST = 'prof/DEL_POST';
const SET_USER_PROFILE = 'prof/SET-USER-PROFILE';
const SET_STATUS = 'prof/SET-STATUS';
const SAVE_AVATAR = 'prof/SAVE_AVATAR';



export type TInitialState = typeof initialState

let initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 38},
        {id: 11, post: 'Ha-h!', likesCount: 38},
        {id: 2, post: 'It\'s a nice day, isn\'t it?', likesCount: 12},
        {id: 3, post: 'Wie gehts es dir?', likesCount: 58},
        {id: 4, post: 'Wie heißt du?', likesCount: 15},
        {id: 5, post: 'Number 5', likesCount: 8},
    ] as Array<TPost>,

    profile: null as TProfile | null,
    status: '',

};

type TActions =
    | TAddPostAC
    | TDelPostAC
    | TSetUserProfileAC
    | TSetUserStatusAC
    | TSetAvatarSuccessAC

const profileReducer = (state = initialState, action: TActions): TInitialState => {
    let stateCopy = {...state};
    switch (action.type) {
        case APP_POST:
            let newPost = {
                id: Date.now(),
                post: action.payload,
                likesCount: 0,
            };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            return stateCopy;

        case DEL_POST:
            return {
                ...state,
                posts: state.posts.filter(value => value.id !== action.payload),
            };

        case SET_USER_PROFILE:
            return {...state, profile: action.profile};

        case SET_STATUS:
            return {...state, status: action.payload};

        case SAVE_AVATAR:
            return {...state, profile: {...state.profile, photos: action.payload} as TProfile};

        default:
            return stateCopy;
    }

};

// ========================
// ---- actionCreators ----
// ========================
type TAddPostAC = { type: typeof APP_POST, payload: string };
type TDelPostAC = { type: typeof DEL_POST, payload: number };
type TSetUserProfileAC = { type: typeof SET_USER_PROFILE, profile: TProfile };
type TSetUserStatusAC = { type: typeof SET_STATUS, payload: string };
type TSetAvatarSuccessAC = { type: typeof SAVE_AVATAR, payload: TPhoto };

export const addPost = (payload: string): TAddPostAC => ({type: APP_POST, payload});
export const delPost = (payload: number): TDelPostAC => ({type: DEL_POST, payload});
const setUserProfile = (profile: TProfile): TSetUserProfileAC => ({type: SET_USER_PROFILE, profile});
const setUserStatus = (payload: string): TSetUserStatusAC => ({type: SET_STATUS, payload});
const setAvatarSuccess = (payload: TPhoto): TSetAvatarSuccessAC => ({type: SAVE_AVATAR, payload});

// =======================
// ---- thunkCreators ----
// =======================
export const Thunks = {
    getProfile: function (userId: number) {
        return (dispatch: any) => {
            profileAPI.getProfile(userId)
                .then(data => {
                    const checkedData = objIterationWithReplacement(data, null, '');
                    // console.log(checkedData);
                    dispatch(setUserProfile({...checkedData, photoDefault: Volodymyr} as TProfile));
                });
        };
    },

    // TODO: add to console.log time of printing
    getStatus: (userId: number) => (dispatch: any) => {
        profileAPI.getProfileStatus(userId)
            .then(data => {
                dispatch(setUserStatus(data));
            });
    },
    updateStatus: (status: string) => (dispatch: any) => {
        profileAPI.updateProfileStatus(status)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            });
    },
    updateAvatar: (file:any) => (dispatch: any) => {
        profileAPI.updateAvatar(file)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setAvatarSuccess(response.data.photos));
                }
            });
    },
    updateProfileInfo: function (values: TProfile) {
        return (dispatch: any, getState: any) => {
            const userId = getState().auth.id;
            profileAPI.updateProfileInfo(values)
                .then(response => {
                    if (response.resultCode === 0) {
                        dispatch(Thunks.getProfile(userId));
                    }
                });
        };
    },
};


export default profileReducer;