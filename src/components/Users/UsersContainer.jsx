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
import { getUsers } from "../../api/api";

class UsersAPIComponent extends React.Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.setIsFetching(true);
    getUsers(this.props.currentPage, this.props.pageSize)
      .then(response => {
        this.props.setIsFetching(false);
        this.props.setUsers(response.data.items.map(item => {
          return { ...item, photoUrl: Volodymyr }
        }));
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  };

  onPageChanged = (page) => {
    this.props.setIsFetching(true);
    this.props.setCurrentPage(page);
    getUsers(this.props.currentPage, this.props.pageSize)
      .then(response => {
      this.props.setIsFetching(false);
      this.props.setUsers(response.data.items.map(item => {
        return { ...item, photoUrl: Volodymyr }
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