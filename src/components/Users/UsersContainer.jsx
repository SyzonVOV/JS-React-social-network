import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  setIsFetching,
  setTotalUsersCount,
  setUsers,
  unfollow
} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Loader from "../common/Loader";
import Volodymyr from "../../assets/images/Volodymyr_the_Great.jpg";

class UsersAPIComponent extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.setIsFetching(true);
    let userURL = Volodymyr;
    //axios.get('https://social-network.samuraijs.com/api/1.0/users', { withCredentials: true })
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${ this.props.currentPage }&count=${ this.props.pageSize }`,
      {withCredentials: true
      })
      .then(response => {
        this.props.setIsFetching(false);
        this.props.setUsers(response.data.items.map(item => {
          return { ...item, photoUrl: userURL }
        }));
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  };

  onPageChanged = (page) => {
    this.props.setIsFetching(true);
    this.props.setCurrentPage(page);
    let userURL = 'https://upload.wikimedia.org/wikipedia/uk/d/d0/%D0%9A%D0%BD%D1%8F%D0%B7%D1%8C_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9.jpg';
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${ page }&count=${ this.props.pageSize }`,
      {withCredentials: true
        }).then(response => {
      this.props.setIsFetching(false);
      this.props.setUsers(response.data.items.map(item => {
        return { ...item, photoUrl: userURL }
      }));
    });
  };

  render() {
    return <>
      {this.props.isFetching
        ? <Loader />
        : <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             users={this.props.users}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             follow={this.props.follow}
             unfollow={this.props.unfollow}/>
      }
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  }
}

//first version of mapDispatchToProps` code
/*const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => { dispatch(followAC(userId)) },
    unfollow: (userId) => { dispatch(unfollowAC(userId)) },
    setUsers: (users) => { dispatch(setUsersAC(users)) },
    setCurrentPage: (page) => { dispatch(setCurrentPageAC(page)) },
    setTotalUsersCount: (count) => { dispatch(setTotalUsersCountAC(count)) },
    setIsFetching: (isFetching) => { dispatch(setIsFetchingAC(isFetching)) },
  }
}*/

//second version of mapDispatchToProps` code
/*
const mapDispatchToProps = {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    setIsFetching: setIsFetchingAC,
}*/

//third version of mapDispatchToProps` code lesson 58
const mapDispatchToProps = {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching,
}

export default connect (mapStateToProps, mapDispatchToProps)(UsersAPIComponent);