import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

// Когда работали с контекстом 44 урок
// После подключили React-Redux
/*let renderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App state={state}
             dispatch={store.dispatch.bind(store)}
             store={store}/>
      </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}*/

//После подключения React-Redux урок 45
//Можно не использовать функцию renderEntireTree...
//...реакт-редах будет сам перерисовывать
let renderEntireTree = () => {
  ReactDOM.render(
   // <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>,
   // </React.StrictMode>,
    document.getElementById('root')
  );
}

renderEntireTree();


//Урок 47 больше не нужно самим подписоваться на изменения стейта...
//...это делает библиотека реакт-редах, когда ми делаем конект
store.subscribe(() => {
    //let state = store.getState()
    renderEntireTree();
  }
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
