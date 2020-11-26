import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { Thunks } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";


class ProfileContainer extends React.Component{

  componentDidMount() {
    console.log(this.props);
    this.props.getUserProfile(this.props.match.params.userId);
  }

  render() {
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

let ProfileContainerWithRout = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRout);