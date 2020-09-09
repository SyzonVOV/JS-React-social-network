import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  newsPage: newsReducer,
  usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store;

export default store;