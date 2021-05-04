import { addPost } from '../../../redux/profile-reducer';
import UserPosts from './UserPosts';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => {
      dispatch(addPost(post))
    },
  }
};

const SuperMyPostContainer = connect(mapStateToProps, mapDispatchToProps)(UserPosts)

export default SuperMyPostContainer;