import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

function MyPosts(props) {

  let postsElements = props.data.posts.map( post => <Post message={post.post} likesCount={post.likesCount}/>  )

  let newPostElement = React.createRef();

  let appPost = () => {
    props.addPost(  );
  }

  let updateTextArea = () => {
    let newTextArea = newPostElement.current.value;
    props.setStateTextArea( newTextArea );
  }

  return (
    <div>
      <div>
        My posts
        <div>
          <div><textarea ref={ newPostElement } onChange={ updateTextArea } cols="30" rows="10" value={ props.data.newPostText }/></div>
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