import React from 'react';
import { connect } from 'react-redux';
import { followTh, getUsersTh, TUsersFilters, unfollowTh } from '../../redux/users-reducer';
import Users from './Users';
import Loader from '../common/Loader';
import { withAuthCheck } from '../_HOC/AuthRedirectHOC';
import { compose } from 'redux';
import userSelectors from '../../redux/selectors/users-selector';
import { TUser } from '../../types';
import { TAppState } from '../../redux/redux-store';

type TMapStat = {
  users: Array<TUser>,
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: Array<number>,
  term: string,
  friend: string
}

type TDispatch = {
  followTh: Function,
  unfollowTh: Function,
  getUsersTh: (currentPage: number, pageSize: number, term: string, friend: string) => void,
}

type TOwnProps = {
  pageTitle: string,
}

type TProps = TMapStat & TDispatch & TOwnProps

class UsersAPIComponent extends React.Component<TProps> {

  componentDidMount() {
//    Changed in lesson 66
    this.props.getUsersTh( this.props.currentPage, this.props.pageSize, '', '' );

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

  onPageChanged = (page: number) => {
    // this.props.setCurrentPage(page);

    //    Changed in lesson 66
    this.props.getUsersTh( page, this.props.pageSize, this.props.term, this.props.friend );

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

  onFilterChanged = (filter: TUsersFilters) => {
    const { pageSize } = this.props;
    this.props.getUsersTh( 1, pageSize, filter.term, filter.friend )
  }

  render() {
    return <>
      <h2>{ this.props.pageTitle }</h2>
      { this.props.isFetching
        ? <Loader/>
        : null }
      <Users totalUsersCount={ this.props.totalUsersCount }
             pageSize={ this.props.pageSize }
             users={ this.props.users }
             currentPage={ this.props.currentPage }
             onPageChanged={ this.onPageChanged }
             onFilterChanged={ this.onFilterChanged }
             followTh={ this.props.followTh }
             unfollowTh={ this.props.unfollowTh }
             followingInProgress={ this.props.followingInProgress }
      />
    </>;
  }
}

// lesson 81 start to use selectors to retrieve date from state
/*const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}*/
const mapStateToProps = (state: TAppState): TMapStat => {
  return {
    users: userSelectors.selectAllUsers( state ),
    pageSize: userSelectors.selectPageSize( state ),
    totalUsersCount: userSelectors.selectQuantityOfUsers( state ),
    currentPage: userSelectors.selectCurrentPage( state ),
    isFetching: userSelectors.selectIsFetching( state ),
    followingInProgress: userSelectors.selectFollowingInProgress( state ),
    term: userSelectors.selectTerm( state ),
    friend: userSelectors.selectFriend( state ),
  };
};


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
  getUsersTh,
};

export default compose(
  connect<TMapStat, TDispatch, TOwnProps, TAppState>( mapStateToProps, mapDispatchToProps ),
  withAuthCheck,
)( UsersAPIComponent );
