import React from "react";
import styles from "./Users.module.css";
import * as axios from "axios";

class Users extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let userURL = 'https://upload.wikimedia.org/wikipedia/uk/d/d0/%D0%9A%D0%BD%D1%8F%D0%B7%D1%8C_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9.jpg';
    //axios.get('https://social-network.samuraijs.com/api/1.0/users', { withCredentials: true })
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      this.props.setUsers(response.data.items.map(item => {
        return {...item, photoUrl: userURL}
      }));
    });
  }

  render() {
    return <div>
      { this.props.users.map(user => <div key={ user.id } className={ styles.item }>
          <div className={ styles.item2 }>
            <div><img src={ user.photos.small != null ? user.photos.small : user.photoUrl} alt="User Photo" className={ styles.userPhoto }/></div>
            <div>{ !user.followed
              ? <button onClick={ () => {this.props.follow(user.id)} }>Follow</button>
              : <button onClick={ () => {this.props.unfollow(user.id)} }>Unfollow</button> }</div>
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

  }
}

let UsersOldStile = (props) => {

  let userURL = 'https://upload.wikimedia.org/wikipedia/uk/d/d0/%D0%9A%D0%BD%D1%8F%D0%B7%D1%8C_%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B8%D0%B9.jpg';

  if ( props.users.length === 0 ) {
    //axios.get('https://social-network.samuraijs.com/api/1.0/users', { withCredentials: true })
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      props.setUsers(response.data.items.map(item => {
        return {...item, photoUrl: userURL}
      }));
    });
  }

  return <div>
    {
      props.users.map(user => <div key={ user.id }>
        <div>
                               {/*{ photos.small || noImageSRC }*/}
          <div><img src={ user.photos.small != null ? user.photos.small : user.photoUrl} alt="" className={ styles.userPhoto }/></div>
          <div>{ !user.followed
            ? <button onClick={ () => {props.follow(user.id)} }>Follow</button>
            : <button onClick={ () => {props.unfollow(user.id)} }>Unfollow</button> }</div>
        </div>
        <div>
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