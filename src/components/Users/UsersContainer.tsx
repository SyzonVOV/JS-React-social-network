import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users';
import Loader from '../common/Loader';
import userSelectors from '../../redux/selectors/users-selector';

type UsersPagePropsType = {
  pageTitle: string
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(userSelectors.selectIsFetching)
  return <>
    <h2>{props.pageTitle}</h2>
    {isFetching ? <Loader/> : null}
    <Users />
  </>
}

export default UsersPage