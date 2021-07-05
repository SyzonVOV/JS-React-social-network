import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import newsReducer from "./news-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from './app-reducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  newsPage: newsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer
});

type TRootReducer = typeof rootReducer;
export type TAppState = ReturnType<TRootReducer>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;