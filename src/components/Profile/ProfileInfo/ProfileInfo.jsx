import React from "react";
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
        <img src={props.profile.photos.large || props.profile.photoUrl} alt="user"/>
        ava + description
      </div>
    </div>
  )
}

export default ProfileInfo;