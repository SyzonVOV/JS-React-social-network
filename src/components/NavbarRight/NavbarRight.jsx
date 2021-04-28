import React from "react";
import style from "./NavbarRight.module.css";

function NavbarRight() {
  return (
    <nav className={style.nav}>
      <div className={style.item}><a href="window.location">Profile</a></div>
      <div className={style.item}><a href="window.location">Messages</a></div>
      <div className={style.item}><a href="window.location">News</a></div>
      <div className={style.item}><a href="window.location">Music</a></div>
      <div className={style.item}><a href="window.location">Settings</a></div>
    </nav>
  )
}

export default NavbarRight;