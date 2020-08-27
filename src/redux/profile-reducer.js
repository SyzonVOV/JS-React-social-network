const APP_POST = 'APP-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
  };


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_POST:
      let newPost = {
        id: 6,
        post: state.newPostText,
        likesCount: 0
      };
      state.posts.push(newPost);
      state.newPostText = '';
      return state;

    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;

    default:
      console.log(`Sorry, we are out of ${action.type} in profile-reducer.`);
      return state;
  }

};

export const addPostActionCreator = () => ({ type: APP_POST });

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  }
};



export default profileReducer;