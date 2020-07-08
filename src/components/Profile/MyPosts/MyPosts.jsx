import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

  let postsElements = props.posts.map( post => <Post message={post.post} likesCount={post.likesCount}/>  )

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
        { postsElements }
      </div>
      <br/>
      <p>Main content</p>
    </div>
  )
}

export default MyPosts;