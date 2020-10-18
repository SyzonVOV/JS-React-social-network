const APP_POST = 'APP-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
    posts: [
      {id: 1, post: 'Hi, how are you?', likesCount: 38},
      {id: 11, post: 'Ha-h!', likesCount: 38},
      {id: 2, post: "It's a nice day, isn't it?", likesCount: 12},
      {id: 3, post: 'Wie gehts es dir?', likesCount: 58},
      {id: 4, post: 'Wie heißt du?', likesCount: 15},
      {id: 5, post: 'Number 5', likesCount: 8},
    ],

    newPostText: '',
    profile: null,
  };


const profileReducer = (state = initialState, action) => {
  let stateCopy = {...state}
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

    default:
      return stateCopy;
  }

};

//ActionCreator
export const addPost = () => ({ type: APP_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const updateNewPostText = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  }
};



export default profileReducer;