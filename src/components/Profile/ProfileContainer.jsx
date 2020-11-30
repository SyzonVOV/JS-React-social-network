import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { Thunks } from "../../redux/profile-reducer";
import { Redirect, withRouter } from "react-router-dom";
import { withAuthCheck } from "../_HOC/AuthRedirectHOC";


class ProfileContainer extends React.Component{

  componentDidMount() {
    // console.log(this.props);
    this.props.getUserProfile(this.props.match.params.userId);
  }

  render() {
    if (!this.props.isAuth) return <Redirect to='/login' />;

    return (
      // throw/pass props deeper
        <Profile {...this.props}/>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});



const mapDispatchToProps = {
  getUserProfile: Thunks.getProfile
}

let WithAuthCheckComponent = withAuthCheck(ProfileContainer);

let ProfileContainerWithRout = withRouter(WithAuthCheckComponent);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRout);