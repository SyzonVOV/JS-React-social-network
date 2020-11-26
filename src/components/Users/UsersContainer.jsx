import React from "react";
import { connect } from "react-redux";
import { followTh, getUsersTh, setCurrentPage, setTotalUsersCount, unfollowTh } from "../../redux/users-reducer";
import Users from "./Users";
import Loader from "../common/Loader";


class UsersAPIComponent extends React.Component {

  componentDidMount() {
//    Changed in lesson 66
    this.props.getUsersTh(this.props.currentPage, this.props.pageSize);

//    Changed in lesson 66
/*    this.props.setIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then(data => {
        this.props.setIsFetching(false);
        this.props.setUsers(data.items.map(item => {
          return { ...item, photoUrl: Volodymyr }
        }));
        this.props.setTotalUsersCount(data.totalCount);
      });*/
  };

  onPageChanged = (page) => {
    this.props.setCurrentPage(page);

    //    Changed in lesson 66
    this.props.getUsersTh(page, this.props.pageSize);

//    Changed in lesson 66
/*    this.props.setIsFetching(true);
    usersAPI.getUsers(page, this.props.pageSize)
      .then(data => {
      this.props.setIsFetching(false);
      this.props.setUsers(data.items.map(item => {
        return { ...item, photoUrl: Volodymyr }
      }));
    });*/
  };

  render() {
    return <>
      { this.props.isFetching
        ? <Loader/>
        : <Users totalUsersCount={ this.props.totalUsersCount }
                 pageSize={ this.props.pageSize }
                 users={ this.props.users }
                 currentPage={ this.props.currentPage }
                 onPageChanged={ this.onPageChanged }
                 followTh={ this.props.followTh }
                 unfollowTh={ this.props.unfollowTh }
                 followingInProgress={ this.props.followingInProgress }
        />
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
    followingInProgress: state.usersPage.followingInProgress,
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
  followTh,
  unfollowTh,
  setCurrentPage,
  setTotalUsersCount,
  getUsersTh,
}

export default connect (mapStateToProps, mapDispatchToProps)(UsersAPIComponent);