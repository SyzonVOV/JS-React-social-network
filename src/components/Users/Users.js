import React from "react";
import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";

let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return <div>
    <div>
      { pages.map(page => <span key={page} className={props.currentPage === page ? styles.selected : undefined} onClick={ () => {
        props.onPageChanged(page)
      } }>{ page }</span>) }
    </div>
    { props.users.map(user => <div key={ user.id } className={ styles.item }>
      <div className={ styles.item2 }>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img src={ user.photos.small != null ? user.photos.small : user.photoUrl } alt="User Photo"
                 className={ styles.userPhoto }/>
          </NavLink>
        </div>
        <div>
          { !user.followed
          ? <button onClick={ () => {
            props.follow(user.id)
          } }>Follow</button>
          : <button onClick={ () => {
            props.unfollow(user.id)
          } }>Unfollow</button> }
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
    </div>)
    }
  </div>
};

export default Users;