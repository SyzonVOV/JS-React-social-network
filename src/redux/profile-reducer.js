import { profileAPI } from '../api/api';
import Volodymyr from '../assets/images/Volodymyr_the_Great.jpg';
import { objIterationWithReplacement } from '../utils/helpers';

const APP_POST = 'prof/APP-POST';
const DEL_POST = 'prof/DEL_POST';
const SET_USER_PROFILE = 'prof/SET-USER-PROFILE';
const SET_STATUS = 'prof/SET-STATUS';
const SAVE_AVATAR = 'prof/SAVE_AVATAR';

let initialState = {
  posts: [
    { id: 1, post: 'Hi, how are you?', likesCount: 38 },
    { id: 11, post: 'Ha-h!', likesCount: 38 },
    { id: 2, post: 'It\'s a nice day, isn\'t it?', likesCount: 12 },
    { id: 3, post: 'Wie gehts es dir?', likesCount: 58 },
    { id: 4, post: 'Wie heißt du?', likesCount: 15 },
    { id: 5, post: 'Number 5', likesCount: 8 },
  ],

  profile: null,
  status: '',
};


const profileReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
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
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.payload };

    case SAVE_AVATAR:
      return { ...state, profile: { ...state.profile, photos: action.payload } };

    default:
      return stateCopy;
  }

};

// ========================
// ---- actionCreators ----
// ========================
export const addPost = (payload) => ({ type: APP_POST, payload });
export const delPost = (payload) => ({ type: DEL_POST, payload });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setUserStatus = (payload) => ({ type: SET_STATUS, payload });
const setAvatarSuccess = (payload) => ({ type: SAVE_AVATAR, payload });


// =======================
// ---- thunkCreators ----
// =======================
export const Thunks = {
  getProfile(userId) {
    return function (dispatch) {
      profileAPI.getProfile(userId)
        .then(data => {
          const checkedData = objIterationWithReplacement(data, null, '');
          // console.log(checkedData);
          dispatch(setUserProfile({ ...checkedData, photoUrl: Volodymyr }));
        });
    };
  },

  // TODO: add to console.log time of printing
  getStatus: (userId) => (dispatch) => {
    profileAPI.getProfileStatus(userId)
      .then(data => {
        dispatch(setUserStatus(data));
      });
  },
  updateStatus: (status) => (dispatch) => {
    profileAPI.updateProfileStatus(status)
      .then(response => {
        if ( response.resultCode === 0 ) {
          dispatch(setUserStatus(status));
        }
      });
  },
  updateAvatar: (file) => (dispatch) => {
    profileAPI.updateAvatar(file)
      .then(response => {
        if ( response.resultCode === 0 ) {
          dispatch(setAvatarSuccess(response.data.photos));
        }
      });
  },
  updateProfileInfo(values) {
    return function (dispatch, getState) {
      const userId = getState().auth.id;
      profileAPI.updateProfileInfo(values)
        .then(response => {
          if ( response.resultCode === 0 ) {
            dispatch(Thunks.getProfile(userId));
          }
        });
    };
  },
};


export default profileReducer;