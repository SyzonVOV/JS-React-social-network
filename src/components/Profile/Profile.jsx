import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./MyPosts/MyPostsContainer";



function Profile() {
  return (
    <div className={style.content}>
      <ProfileInfo />
      <SuperMyPostContainer/>
    </div>
  )
}

export default Profile;