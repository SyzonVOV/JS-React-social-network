import React from "react";
import style from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

function DialogItem(props) {
  return (
    <div className={style.dialog}>
      <NavLink to={`/dialogs/${props.id}`}>{props.userName}</NavLink>
    </div>
  )
}

function Message(props) {
  return (
    <div className={style.message}>{props.message}</div>
  )
}

function Dialogs(props) {

  let dialogs = props.state.dialogs;

  let messages = props.state.messages;

  let dialogElements = dialogs.map( dialog => <DialogItem userName={dialog.name} id={dialog.name}/> )

  let messageElements = messages.map( message => <Message message={message.message}/> )

  return (
    <div className={style.dialogs}>
      <div className={style.header}><p>Dialogs</p></div>
      <div className={style.dialogsUsers}>
        { dialogElements }
      </div>
      <div className={style.messagesUser}>
        { messageElements }
      </div>
    </div>
  )
}

export default Dialogs;