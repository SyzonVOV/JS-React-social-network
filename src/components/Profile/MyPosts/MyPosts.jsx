import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts() {
  return (
    <div>
      <div>
        My posts
        <div>
          New post 2
        </div>
      </div>
      <div>
        All posts
        <Post message='Hi, how are you?'/>
        <Post message="It's a nice day, isn't it?"/>
        <Post message="Number 1"/>
        <Post message="Number 2"/>
        <Post message="Number 3"/>
        <Post message="Number 4"/>
        <Post message="Number 5"/>
        <Post message="Number 6"/>
        <Post message="Number 7"/>
        <Post message="Number 8"/>
      </div>
      <br/>
      <p>Main content</p>
    </div>
  )
}

export default MyPosts;