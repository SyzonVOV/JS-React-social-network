import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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

import { Breadcrumb, Layout } from 'antd';

const { Content, Footer } = Layout;

const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends React.Component {

  catchUnhandledRejection = (event) => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${ event.reason }`);
  };

  componentDidMount() {
    this.props.getInitialized();
    window.addEventListener('unhandledrejection', this.catchUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchUnhandledRejection);
  }

  render() {
    const { init } = this.props;
    if ( !init ) return <Loader/>;
    return (
      <Layout>
        <HeaderContainer/>
        <Content style={ { padding: '0 50px' } }>
          <Breadcrumb style={ { margin: '16px 0' } }>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={ { padding: '24px 0' } }>
            <NavbarLeft/>
            <Content style={ { padding: '0 24px', minHeight: 280 } }>
              <Switch>
                <Route path="/dialogs">
                  <SuperDialogsContainer/>
                </Route>
                <Redirect exact from="/" to={ this.props.isAuth ?
                  '/profile' :
                  '/login' }/>
                <Route path="/login" component={ Login }/>
                <Route path="/profile/:userId?" render={ () => <ProfileContainer/> }/>
                <Route path="/users" render={ () => <UsersContainer pageTitle={ 'Samurais' }/> }/>
                <Suspense fallback={ <Loader/> }>
                  <Route path="/news" component={ News }/>
                  <Route path="/music" component={ Music }/>
                  <Route path="/settings" component={ Settings }/>
                </Suspense>
                <Route render={ () => <div>404 Page Not Found</div> }/>
              </Switch>
            </Content>
          <NavbarRight/>
          </Layout>
        </Content>
        <Footer style={ { textAlign: 'center' } }>Social NetWork for JS Samurais © 2019 - {new Date().getFullYear()} Все права защищены</Footer>
      </Layout>
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