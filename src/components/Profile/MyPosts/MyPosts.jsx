import React from "react";
// import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

  let postsElements = props.posts.map( post => <Post key={post.id} message={post.post} likesCount={post.likesCount}/>  )

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let newTextArea = newPostElement.current.value;
    props.updateTextArea(newTextArea);
  }
  return (
    <div>
      <div>
        My posts
        <div>
          <div><textarea ref={ newPostElement } onChange={ onPostChange } cols="30" rows="10" value={ props.newPostText }/></div>
          <div><button onClick={ onAddPost }>Add post</button></div>
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