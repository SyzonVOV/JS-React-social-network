import {followAPI, usersAPI} from '../api/api';
import Volodymyr from '../assets/images/Volodymyr_the_Great.jpg';
import {TUser} from "../types";
import {ThunkAction} from "redux-thunk";
import {TAppState} from "./redux-store";
//import {Dispatch} from "redux";

const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const SET_USERS = 'user/SET-USERS';
const SET_TOTAL_USERS_COUNT = 'user/SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'user/TOGGLE_FOLLOWING_PROGRESS';

type TInitialState = typeof initialState
let initialState = {
    users: [] as Array<TUser>,
    pageSize: 40,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id
};

type TActions =
    | TFollowSuccessAC
    | TUnfollowSuccessAC
    | TSetUsersAC
    | TSetCurrentPageAC
    | TSetTotalUsersCountAC
    | TSetIsFetchingAC
    | TToggleFollowingProgressAC

const usersReducer = (state = initialState, action: TActions): TInitialState => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: true};
                    }
                    return user;
                }) as Array<TUser>,
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: false};
                    }
                    return user;
                }),
            };

        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            };

        default:
            return state;
    }

};

//action creators
type TFollowSuccessAC = { type: typeof FOLLOW, userID: number };
type TUnfollowSuccessAC = { type: typeof UNFOLLOW, userID: number };
type TSetUsersAC = { type: typeof SET_USERS, users: Array<TUser> };
type TSetCurrentPageAC = { type: typeof SET_CURRENT_PAGE, currentPage: number };
type TSetTotalUsersCountAC = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number };
type TSetIsFetchingAC = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean };
type TToggleFollowingProgressAC = { type: typeof TOGGLE_FOLLOWING_PROGRESS, isFetching: boolean, userId: number };

export const followSuccess = (userID: number): TFollowSuccessAC => ({type: FOLLOW, userID});
export const unfollowSuccess = (userID: number): TUnfollowSuccessAC => {
    return {
        type: UNFOLLOW,
        userID,
    };
};
export const setUsers = (users: Array<TUser>): TSetUsersAC => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number): TSetCurrentPageAC => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount: number): TSetTotalUsersCountAC => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
});
export const setIsFetching = (isFetching: boolean): TSetIsFetchingAC => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): TToggleFollowingProgressAC => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});

//thunkCreators
//One way to provide types separately for dispatch and getState in return ThunkAction
//type GetStateType = () => TAppState
//type DispatchType = Dispatch<TActions>
//Another way is to provide types for return value of ThunkCreator
type TThunk = ThunkAction<void, TAppState, unknown, TActions>

export const getUsersTh = (currentPage: number, pageSize: number): TThunk =>
    (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items.map((item: TUser) => {
                    return {...item, photoUrl: Volodymyr};
                })));
                dispatch(setTotalUsersCount(data.totalCount));
            })
            .catch(err => console.log(err));
    };

export const followTh = (userId: number): TThunk => (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.postFollow(userId)
        .then((data: any) => {
            if (data.resultCode === 0) dispatch(followSuccess(userId));
            dispatch(toggleFollowingProgress(false, userId));
        })
        .catch((err: any) => console.log(err));
};

export const unfollowTh = (userId: number): TThunk => (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.deleteFollow(userId)
        .then((data: any) => {
            if (data.resultCode === 0) dispatch(unfollowSuccess(userId));
            dispatch(toggleFollowingProgress(false, userId));
        })
        .catch((err: any) => console.log(err));
};

export default usersReducer;