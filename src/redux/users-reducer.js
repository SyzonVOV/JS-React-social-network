import { followAPI, usersAPI } from "../api/api";
import Volodymyr from "../assets/images/Volodymyr_the_Great.jpg";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
  users: [],
  pageSize: 40,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};


const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if ( user.id === action.userID ) {
            return { ...user, followed: true }
          }
          return user;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if ( user.id === action.userID ) {
            return { ...user, followed: false }
          }
          return user;
        })
      };

    case SET_USERS:
      return {
        ...state,
        users: [ ...action.users ]
      }

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }

    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter(id => id !== action.userId),
      }

    default:
      return state;
  }

};

//action creators
export const followSuccess = (userID) => ({ type: FOLLOW, userID });
export const unfollowSuccess = (userID) => {
  return {
    type: UNFOLLOW,
    userID
  }
};
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const setIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId });

//thunkCreators
export const getUsersTh = (currentPage, pageSize) => (dispatch) => {
  dispatch(setIsFetching(true));
  usersAPI.getUsers(currentPage, pageSize)
    .then(data => {
      dispatch(setIsFetching(false));
      dispatch(setUsers(data.items.map(item => {
        return { ...item, photoUrl: Volodymyr }
      })));
      dispatch(setTotalUsersCount(data.totalCount));
    });
}

export const followTh = (userId) => (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  followAPI.postFollow(userId)
    .then(data => {
      if ( data.resultCode === 0 ) dispatch(followSuccess(userId));
      dispatch(toggleFollowingProgress(false, userId));
    })
    .catch(err => console.log(err));
}

export const unfollowTh = (userId) => (dispatch) => {
  dispatch(toggleFollowingProgress(true, userId));
  followAPI.deleteFollow(userId)
    .then(data => {
      if ( data.resultCode === 0 ) dispatch(unfollowSuccess(userId));
      dispatch(toggleFollowingProgress(false, userId));
    })
    .catch(err => console.log(err));
}

export default usersReducer;