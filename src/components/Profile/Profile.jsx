import React from "react";
import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



function Profile(props) {
  return (
    <div className={style.content}>
      <ProfileInfo />
      <MyPosts data={props.data} addPost={props.addPost} setStateTextArea={props.setStateTextArea}/>
    </div>
  )
}

export default Profile;