import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavbarLeft from "./components/NavbarLeft/NavbarLeft";
import Profile from "./components/Profile/Profile";
import NavbarRigth from "./components/NavbarRight/NavbarRigth";
import {BrowserRouter, Route} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

function App(props) {
  console.log(props);
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
        <NavbarLeft/>
        <div className='app-wrapper-content'>
          <Route path='/dialogs'>
            <Dialogs state={props.state.dialogsPage}/>
          </Route>
          <Route path='/profile' render={() => <Profile posts={props.state.profilePage.posts}/>}/>
          <Route path='/news' component={News}/>
          <Route path='/music' component={Music}/>
          <Route path='/settings' component={Settings}/>
        </div>
        <NavbarRigth/>
      </div>

    </BrowserRouter>
  );
}

export default App;
