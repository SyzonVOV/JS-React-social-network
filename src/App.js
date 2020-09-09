import React from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import NavbarLeft from "./components/NavbarLeft/NavbarLeft";
import Profile from "./components/Profile/Profile";
import NavbarRigth from "./components/NavbarRight/NavbarRigth";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import SuperDialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App() {
  return (
      <div>
        <Header />
        <NavbarLeft />     
          <div className='app-wrapper-content'>
            <Route path='/dialogs'>
              <SuperDialogsContainer />
            </Route>
            <Route path='/profile' render={ () => <Profile/> } />
            <Route path='/users' render={ () => <UsersContainer/> } />
            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
          </div>
        <NavbarRigth />
      </div>
  );
}

export default App;
