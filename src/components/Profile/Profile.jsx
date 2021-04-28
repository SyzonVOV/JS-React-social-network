import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./MyPosts/MyPostsContainer";


function Profile(props) {

  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} handleUpdateStatus={props.updateUserStatus}/>
      <SuperMyPostContainer/>
    </div>
  )
}

export default Profile;