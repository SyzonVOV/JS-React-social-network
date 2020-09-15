const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';


let initialState = {
  users: [],
  pageSize: 40,
  totalUsersCount: 0,
  currentPage: 1,
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

    default:
      return state;
  }

};


export const followAC = (userID) => ({ type: FOLLOW, userID });

export const unfollowAC = (userID) => {
  return {
    type: UNFOLLOW,
    userID
  }
};

export const setUsersAC = (users) => ({ type: SET_USERS, users });

export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

export default usersReducer;