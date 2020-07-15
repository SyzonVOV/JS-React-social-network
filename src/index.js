import * as serviceWorker from './serviceWorker';
import state from "./redux/state.js";
import {addPost, setStateTextArea} from "./redux/state";
import {renderEntireTree} from "./render";


renderEntireTree(state, addPost, setStateTextArea);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
