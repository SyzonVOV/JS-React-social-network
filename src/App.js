import React, { Suspense } from 'react';
import { Redirect, Route,Switch } from 'react-router-dom';
import './App.css';
import NavbarLeft from './components/NavbarLeft/NavbarLeft';
import NavbarRight from './components/NavbarRight/NavbarRight';
import SuperDialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { Thunks } from './redux/app-reducer';
import Loader from './components/common/Loader';

const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends React.Component {

  componentDidMount() {
    this.props.getInitialized();
  }

  render() {
    const { init } = this.props;
    if ( !init ) return <Loader/>;
    return (
      <div>
        <HeaderContainer/>
        <NavbarLeft/>
        <div className="app-wrapper-content">
          <Switch>
          <Route path="/dialogs">
            <SuperDialogsContainer/>
          </Route>
          <Redirect exact from="/" to={ this.props.isAuth ?
            '/profile' :
            '/login' }/>
          <Route path="/login" component={ Login }/>
          <Route path="/profile/:userId?" render={ () => <ProfileContainer/> }/>
          <Route path="/users" render={ () => <UsersContainer/> }/>
          <Suspense fallback={ <Loader/> }>
            <Route path="/news" component={ News }/>
            <Route path="/music" component={ Music }/>
            <Route path="/settings" component={ Settings }/>
          </Suspense>
          <Route render={ () => <div>404 Page Not Found</div> }/>
          </Switch>
        </div>
        <NavbarRight/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  init: state.app.initialized,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
  getInitialized: Thunks.getInitializeApp,
})(App);