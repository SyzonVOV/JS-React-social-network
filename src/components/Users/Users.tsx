import React, { useEffect } from 'react';
import styles from './Users.module.css';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import { TUser } from '../../types';
import { UsersSearchForm } from './UsersSearchForm';
import { getUsersTh, TUsersFilters, unfollowTh, followTh } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import userSelectors from '../../redux/selectors/users-selector';

type TUsersProps = {}

const Users: React.FC<TUsersProps> = ()=> {

  const totalUsersCount = useSelector( userSelectors.selectQuantityOfUsers )
  const users = useSelector( userSelectors.selectAllUsers )
  const currentPage = useSelector( userSelectors.selectCurrentPage )
  const pageSize = useSelector( userSelectors.selectPageSize )
  const term = useSelector( userSelectors.selectTerm )
  const friend = useSelector( userSelectors.selectFriend )
  const followingInProgress = useSelector( userSelectors.selectFollowingInProgress )

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( getUsersTh( currentPage, pageSize, '', '' ) );
  }, [] )

  const onPageChanged = (pageNumber: number) => {
    dispatch( getUsersTh( pageNumber, pageSize, term, friend ) );
  }

  const onFilterChanged = (filter: TUsersFilters) => {
    dispatch( getUsersTh( 1, pageSize, filter.term, filter.friend ) );
  }

  const follow = (userId: number) => {
    dispatch( followTh( userId ) );
  }

  const unfollow = (userId: number) => {
    dispatch( unfollowTh( userId ) );
  }

  return <div>

    <UsersSearchForm onFilterChanged={ onFilterChanged }/>

    <Paginator currentPage={ currentPage } onPageChanged={ onPageChanged } pageSize={ pageSize }
               totalItemsCount={ totalUsersCount }/>
    { users.map( user => (
      <User user={ user }
            followingInProgress={ followingInProgress }
            followTh={ follow }
            unfollowTh={ unfollow }
            key={ user.id }
      />) )
    }
  </div>;
};


/*
const Paginator = (props) => {
  useTraceUpdate(props)
  const { totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 } = props
  const [portionNumber, setPortionNumber] = useState(1);

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={ styles.paginator }>
      { portionNumber > 1 &&
      <button onClick={ () => {
        setPortionNumber(portionNumber - 1);
      } }>PREV</button> }

      { pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(page => <span key={ page }
                           className={ currentPage === page ? styles.selected : undefined }
                           onClick={ () => {
                             onPageChanged(page);
                           } }>{ page }</span>) }

      { portionNumber < portionCount &&
      <button onClick={ () => {
        setPortionNumber(portionNumber + 1);
      } }>NEXT</button> }
    </div>);
};
*/

type TUserProps = {
  user: TUser
  followingInProgress: Array<number>
  followTh: Function,
  unfollowTh: Function
}

const User: React.FC<TUserProps> = ({ user, followingInProgress, unfollowTh, followTh }) => {

  return <div key={ user.id } className={ styles.item }>

    <div className={ styles.item2 }>

      <div>
        <NavLink to={ `/profile/${ user.id }` }>
          <img src={ user.photos.small != null ? user.photos.small : user.photoUrl } className={ styles.userPhoto }
               alt="User"
          />
        </NavLink>
      </div>

      <div>
        { user.followed
          ? <button disabled={ followingInProgress.some( id => id === user.id ) }
                    onClick={ () => {
                      unfollowTh( user.id );
                    } }>Unfollow</button>

          : <button disabled={ followingInProgress.some( id => id === user.id ) }
                    onClick={ () => {
                      followTh( user.id );
                    } }>Follow</button> }
      </div>

    </div>

    <div className={ styles.item3 }>
      <div>
        <div>{ user.name }</div>
        <div>{ user.status }</div>
      </div>

      <div>
        <div>{ 'user.location.county' }</div>
        <div>{ 'user.location.city' }</div>
      </div>
    </div>
  </div>;

};


export default Users;
