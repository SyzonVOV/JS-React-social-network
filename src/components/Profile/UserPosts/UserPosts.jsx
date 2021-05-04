import React from 'react';
// import style from "./UserPosts.module.css";
import { Field, Form, Formik } from 'formik';
import Post from './Post/Post';

function UserPosts(props) {

  let postsElements = props.posts.map(post => <Post key={ post.id } message={ post.post }
                                                    likesCount={ post.likesCount }/>);

  return (
    <>
      <div>
        <TextAreaForm addPost={ props.addPost }/>
      </div>
      <div>
        <h2>All posts</h2>
        { postsElements }
      </div>
      <br/>
    </>
  );
}

const TextAreaForm = (props) => (
  <div className="form-container">
    <h2>My posts</h2>

    <Formik
      initialValues={ { post: '' } }
      onSubmit={ ({ post }, actions) => {
        props.addPost(post);
        actions.setSubmitting(false);
        actions.resetForm();
      } }
    >
      { ({ isSubmitting }) => (
        <Form>
          <Field component="textarea" name="post" rows="5" cols="50"/>
          <div className="button-container">
            <button className="button--submit" type="submit" disabled={ isSubmitting }>
              Save
            </button>
          </div>
        </Form>
      ) }
    </Formik>
  </div>
);

export default UserPosts;