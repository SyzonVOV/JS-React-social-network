import React from "react";
import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



function Profile(props) {
  return (
    <div className={style.content}>
      <ProfileInfo />
      <MyPosts posts={props.posts} addPost={props.addPost}/>
    </div>
  )
}

export default Profile;