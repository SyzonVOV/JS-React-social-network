import React from "react";
import style from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
  return (
    <div className={style.content}>
      <div>
        <img src="https://wallpaperaccess.com/full/1282257.jpg" alt="" width='100%'/>
      </div>
      <div>
        ava + description
      </div>
      <MyPosts />
    </div>
  )
}

export default Profile;