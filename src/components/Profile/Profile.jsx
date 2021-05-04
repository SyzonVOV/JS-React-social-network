import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./UserPosts/UserPostsContainer";


function Profile(props) {

  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} handleUpdateStatus={props.updateUserStatus}/>
      <SuperMyPostContainer/>
    </div>
  )
}

export default Profile;