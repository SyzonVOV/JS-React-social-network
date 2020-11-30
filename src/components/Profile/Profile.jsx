import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./MyPosts/MyPostsContainer";


function Profile(props) {

  return (
    <div>
      <ProfileInfo profile={props.profile}/>
      <SuperMyPostContainer/>
    </div>
  )
}

export default Profile;