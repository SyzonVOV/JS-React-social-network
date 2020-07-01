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

function Dialogs() {
  return (
    <div className={style.dialogs}>
      <div className={style.header}><p>Dialogs</p></div>
      <div className={style.dialogsUsers}>
        <DialogItem userName="Dymich" id="1"/>
        <DialogItem userName="Andrey" id="2"/>
        <DialogItem userName="Serg" id="3"/>
        <DialogItem userName="Anton" id="4"/>
        <DialogItem userName="Galia" id="5"/>
        <DialogItem userName="Svieta" id="6"/>
        <DialogItem userName="Gena" id="7"/>
      </div>
      <div className={style.messagesUser}>
        <Message message='Hi'/>
        <Message message='How are you?'/>
        <Message message='Wie gehts es dir?'/>
        <Message message='Wie heißt du?'/>
        <Message message='Guten Tag!'/>
        <div className={style.message}>Good morning!!!</div>
        <div className={style.message}>Guten Tag!</div>
        <div className={style.message}>Where have you been?</div>
      </div>
    </div>
  )
}

export default Dialogs;