import React from "react";
import style from "./ProfileInfo.module.css";
import Loader from "../../common/Loader";


function ProfileInfo(props) {
/*
  console.log(props)
  debugger
*/
  if (!props.profile) return <Loader />

  return (
    <div>
      <div>
        <img src="https://wallpaperaccess.com/full/1282257.jpg" alt="" width='100%'/>
      </div>
      <div>
        <img src={props.profile.photos.large}/>
        ava + description
      </div>
    </div>
  )
}

export default ProfileInfo;