// lesson 81 components need a prepared data, structure of which could be different from the state structure
// In the state data structure could change anytime
// for this reason and to encapsulate the logic of retrieving data from the state, we use selectors

import { TAppState } from '../redux-store';

const selectAllUsers = (state: TAppState) => state.usersPage.users;
const selectPageSize = (state: TAppState) => state.usersPage.pageSize;
const selectQuantityOfUsers = (state: TAppState) => state.usersPage.totalUsersCount;
const selectCurrentPage = (state: TAppState) => state.usersPage.currentPage;
const selectIsFetching = (state: TAppState) => state.usersPage.isFetching;
const selectTerm = (state: TAppState) => state.usersPage.filters.term;
const selectFriend = (state: TAppState) => state.usersPage.filters.friend;
const selectFollowingInProgress = (state: TAppState) => state.usersPage.followingInProgress;

const userSelectors ={
  selectAllUsers,
  selectPageSize,
  selectQuantityOfUsers,
  selectCurrentPage,
  selectIsFetching,
  selectFollowingInProgress,
  selectTerm,
  selectFriend
}


export default userSelectors
