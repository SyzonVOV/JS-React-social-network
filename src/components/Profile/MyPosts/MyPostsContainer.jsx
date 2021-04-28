import React from "react";
import {addPost, updateNewPostText} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

export function MyPostsContainer(props) {

  let state = props.store.getState();

  let addPostNew = () => {
    props.store.dispatch(addPost());
  }

  let updateTextArea = (newTextArea) => {
    props.store.dispatch(updateNewPostText(newTextArea));
  }
  return (
    <MyPosts posts={state.profilePage.posts}
             newPostText={state.profilePage.newPostText}
             addPost={addPostNew}
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
      dispatch(addPost())
    },
    updateTextArea: (newTextArea) => {
      dispatch(updateNewPostText(newTextArea))
    },
  }
};

const SuperMyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default SuperMyPostContainer;