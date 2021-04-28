import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { Thunks } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthCheck } from "../_HOC/AuthRedirectHOC";
import { compose } from "redux";


class ProfileContainer extends React.Component {

  componentDidMount() {
    // console.log(this.props);
    this.props.getUserProfile(this.props.match.params.userId);
    this.props.getUserStatus(this.props.match.params.userId);
  }

  render() {
    return (
      // throw/pass props deeper
      <Profile { ...this.props }/>
    )
  }
}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
});

const mapDispatchToProps = {
  getUserProfile: Thunks.getProfile,
  getUserStatus: Thunks.getStatus,
  updateUserStatus: Thunks.updateStatus,
}
// TODO: why auth always says login, even if I'm logged
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthCheck
)(ProfileContainer)

