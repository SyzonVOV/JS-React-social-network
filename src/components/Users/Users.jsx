import React from "react";
import styles from "./Users.module.css";

let Users = (props) => {

  let userURL = 'https://upload.wikimedia.org/wikipedia/uk/d/d0/%D0%9A%D0%BD%D1%8F%D0%B7%D1%8C_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9.jpg';

  if ( props.users.length === 0 ) {
    props.setUsers([
      {id: 1, photoUrl: userURL, followed: false, fullName: 'Volodymyr', status: 'I am a boss here', location: {county: 'Ukraine', city: 'Chernigiv'}},
      {id: 2, photoUrl: userURL, followed: false, fullName: 'Natasha', status: 'Hello', location: {county: 'Germany', city: 'Berlin'}},
      {id: 3, photoUrl: userURL, followed: true, fullName: 'Sergei', status: 'Hey there', location: {county: 'Ukraine', city: 'Kiev'}},
    ]);
  }

  return <div>
    {
      props.users.map(user => <div key={ user.id }>
        <div>
          <div><img src={ user.photoUrl } alt="" className={ styles.userPhoto }/></div>
          <div>{ !user.followed
            ? <button onClick={ () => {props.follow(user.id)} }>Follow</button>
            : <button onClick={ () => {props.unfollow(user.id)} }>Unfollow</button> }</div>
        </div>
        <div>
          <div>
            <div>{ user.fullName }</div>
            <div>{ user.status }</div>
          </div>
          <div>
            <div>{ user.location.county }</div>
            <div>{ user.location.city }</div>
          </div>
        </div>
      </div>)
    }
  </div>
};

export default Users;