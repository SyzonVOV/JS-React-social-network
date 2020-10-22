import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";



class ProfileContainer extends React.Component{

  componentDidMount() {
    // debugger
    let userId = this.props.match.params.userId || 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(response => {
        this.props.setUserProfile(response.data);
      });
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
  setUserProfile,
}

let ProfileContainerWithRout = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRout);