import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


let posts = [
  {id: 1, post: 'Hi, how are you?', likesCount: 38},
  {id: 11, post: 'Ha-h!', likesCount: 38},
  {id: 2, post: "It's a nice day, isn't it?", likesCount: 12},
  {id: 3, post: 'Wie gehts es dir?', likesCount: 58},
  {id: 4, post: 'Wie heißt du?', likesCount: 15},
  {id: 5, post: 'Number 1', likesCount: 8},
]

let dialogsData = {

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
  ]
}


ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogsData = {dialogsData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
