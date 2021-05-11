// lesson 81 components need a prepared data, structure of which could be different from the state structure
// In the state data structure could change anytime
// for this reason and to encapsulate the logic of retrieving data from the state, we use selectors

const selectAllUsers = (state) => state.usersPage.users;
const selectPageSize = (state) => state.usersPage.pageSize;
const selectQuantityOfUsers = (state) => state.usersPage.totalUsersCount;
const selectCurrentPage = (state) => state.usersPage.currentPage;
const selectIsFetching = (state) => state.usersPage.isFetching;
const selectFollowingInProgress = (state) => state.usersPage.followingInProgress;

const userSelectors ={
  selectAllUsers, selectPageSize, selectQuantityOfUsers,selectCurrentPage,selectIsFetching,selectFollowingInProgress
}


export default userSelectors
