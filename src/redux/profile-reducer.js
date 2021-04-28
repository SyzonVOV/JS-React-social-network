import { profileAPI } from "../api/api";
import Volodymyr from "../assets/images/Volodymyr_the_Great.jpg";

const APP_POST = 'APP-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
  posts: [
    { id: 1, post: 'Hi, how are you?', likesCount: 38 },
    { id: 11, post: 'Ha-h!', likesCount: 38 },
    { id: 2, post: "It's a nice day, isn't it?", likesCount: 12 },
    { id: 3, post: 'Wie gehts es dir?', likesCount: 58 },
    { id: 4, post: 'Wie heißt du?', likesCount: 15 },
    { id: 5, post: 'Number 5', likesCount: 8 },
  ],

  newPostText: '',
  profile: null,
  status: '',
};


const profileReducer = (state = initialState, action) => {
  let stateCopy = { ...state }
  switch (action.type) {
    case APP_POST:
      let newPost = {
        id: 6,
        post: stateCopy.newPostText,
        likesCount: 0
      };
      stateCopy.posts = [...state.posts]
      stateCopy.posts.push(newPost);
      stateCopy.newPostText = '';
      return stateCopy;

    case UPDATE_NEW_POST_TEXT:
      stateCopy.newPostText = action.newText;
      return stateCopy;

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.payload };

    default:
      return stateCopy;
  }

};

// ========================
// ---- actionCreators ----
// ========================
export const addPost = () => ({ type: APP_POST });
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
const setUserStatus = (payload) => ({ type: SET_STATUS, payload });

export const updateNewPostText = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  }
};

// =======================
// ---- thunkCreators ----
// =======================
export const Thunks = {
  getProfile: (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setUserProfile({ ...data, photoUrl: Volodymyr }));
      });
  },

  // TODO: add to console.log time of printing
  getStatus: (userId) => (dispatch) => {
    profileAPI.getProfileStatus(userId)
      .then(data => {
        console.log(`Thunks getProfileStatus at  ${data}`)
        dispatch(setUserStatus(data));
      });
  },
  updateStatus: (status) => (dispatch) => {
    profileAPI.updateProfileStatus(status)
      .then(response => {
        console.log(response);
        if ( response.data.resultCode === 0 ) {
          dispatch(setUserStatus(status));
        }
      });
  }
}


export default profileReducer;