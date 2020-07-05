import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

/*  let posts = [
    {id: 1, post: 'Hi, how are you?', likesCount: 38},
    {id: 2, post: "It's a nice day, isn't it?", likesCount: 12},
    {id: 3, post: 'Wie gehts es dir?', likesCount: 58},
    {id: 4, post: 'Wie heißt du?', likesCount: 15},
    {id: 5, post: 'Number 1', likesCount: 8},
  ]*/

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