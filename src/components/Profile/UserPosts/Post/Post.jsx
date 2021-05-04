import React from "react";
import style from "./Post.module.css";

function Post(props) {
  return (
    <div>
      <div className={style.item}>{props.message}</div>
      <div>{props.likesCount}</div>
    </div>
  )
}

export default Post;