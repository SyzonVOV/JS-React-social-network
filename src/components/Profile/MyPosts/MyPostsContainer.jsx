import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

function MyPostsContainer(props) {

  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  }

  let updateTextArea = (newTextArea) => {
    props.store.dispatch(updateNewPostTextActionCreator(newTextArea));
  }
  return (
    <MyPosts posts={state.profilePage.posts}
             newPostText={state.profilePage.newPostText}
             addPost={addPost}
             updateTextArea={updateTextArea}/>
  )
}

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator())
    },
    updateTextArea: (newTextArea) => {
      dispatch(updateNewPostTextActionCreator(newTextArea))
    },
  }
};

const SuperMyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default SuperMyPostContainer;