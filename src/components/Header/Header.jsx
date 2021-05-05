import React from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";

//TODO: make a separate component for logout

function Header(props) {
  const {isAuth, login, handleLogout } = props
  return (
      <header className={style.header}>
        <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/42/d5/af/42d5afc2-b3d3-56ad-1650-018544ec1079/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png" alt="Logo"/>
        <div className={style.loginBlock}>
          { isAuth
              ? <div>{ login } - <button onClick={handleLogout}>Logout</button></div>
              : <NavLink to={'/login'}>Login</NavLink>}
        </div>
      </header>
  )
}

export default Header;