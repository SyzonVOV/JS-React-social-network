import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { Thunks } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthCheck } from '../_HOC/AuthRedirectHOC';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    // from here ↓ it is not necessary, but just to keep the code the same as in the lesson I will leave it
    // profile page is protected by withAuthCheck HOC
    if ( !userId ) {
      userId = this.props.authUserID;
      if ( !userId ) {
      this.props.history.push('/login');
      }
    }
    // down here ↑
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }

  render() {
    return (
      // throw/pass props deeper
      <Profile { ...this.props }/>
    );
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserID: state.auth.id,
});

const mapDispatchToProps = {
  getUserProfile: Thunks.getProfile,
  getUserStatus: Thunks.getStatus,
  updateUserStatus: Thunks.updateStatus,
};
// FIXME: why auth always says login, even if I'm logged
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthCheck,
)(ProfileContainer);

