import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import Profile from "./Profile";
import { addPost, setUserProfile, updateNewPostText } from "../../redux/profile-reducer";



class ProfileContainer extends React.Component{

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);