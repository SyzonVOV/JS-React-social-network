import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

  let postsElements = props.posts.map( post => <Post message={post.post} likesCount={post.likesCount}/>  )

  let newPostElement = React.createRef();

  let appPost = () => {
    let newPost = newPostElement.current.value;
    newPostElement.current.value = '';
    props.addPost( newPost );
  }

  return (
    <div>
      <div>
        My posts
        <div>
          <div><textarea ref={ newPostElement } cols="30" rows="10"></textarea></div>
          <div><button onClick={ appPost }>Add post</button></div>
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