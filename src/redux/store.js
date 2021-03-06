import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
  _state: {

    profilePage: {
      posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 38},
        {id: 11, post: 'Ha-h!', likesCount: 38},
        {id: 2, post: "It's a nice day, isn't it?", likesCount: 12},
        {id: 3, post: 'Wie gehts es dir?', likesCount: 58},
        {id: 4, post: 'Wie heißt du?', likesCount: 15},
        {id: 5, post: 'Number 1', likesCount: 8},
      ],

      newPostText: '',
    },

    dialogsPage: {
      dialogs: [
        {id: 1, name: 'Vovan'},
        {id: 2, name: 'Dymych'},
        {id: 3, name: 'Serg'},
        {id: 6, name: 'Sveta'},
        {id: 7, name: 'Olga'},
        {id: 8, name: 'Dasha'},
      ],

      messages: [
        {id: 1, message: 'Hi!!!!'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Wie gehts es dir?'},
        {id: 4, message: 'Wie heißt du?'},
        {id: 5, message: 'Guten Tag!'},
      ],

      newMessageBody: "",
    },

  },

  _callSubscriber() {
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  getState() {
    return this._state;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);

  },

};

window.store = store;

export default store;