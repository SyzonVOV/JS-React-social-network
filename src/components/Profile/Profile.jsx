import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SuperMyPostContainer from "./MyPosts/MyPostsContainer";



function Profile(props) {
  console.log(props)
  //debugger

  return (
    <div className={style.content}>
      <ProfileInfo profile={props.profile}/>
      <SuperMyPostContainer/>
    </div>
  )
}

export default Profile;