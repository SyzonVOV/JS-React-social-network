import React from "react";
import style from "./Post.module.css";

function Post(props) {
  return (
    <div>
        <div className={style.item}>{props.message}</div>
    </div>
  )
}

export default Post;