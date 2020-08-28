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
  let state = props.dialogsPage;

  let dialogs = state.dialogs;
  let messages = state.messages;
  let newMessageBody = state.newMessageBody;

  let dialogElements = dialogs.map( dialog => <DialogItem userName={dialog.name} key={dialog.id} id={dialog.id}/> )
  let messageElements = messages.map( message => <Message message={message.message} key={message.id}/> )

  const onSendMessageClick = () => {
    props.sendMessage();
  };

  const onNewMessageChanged = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body)
  };

  return (
    <div className={style.dialogs}>
      <div className={style.header}><p>Dialogs</p></div>
      <div className={style.dialogsUsers}>
        { dialogElements }
      </div>
      <div className={style.messagesUser}>
        <div>{messageElements}</div>
        <div>
          <div><textarea placeholder={'Enter your message here.'}
                         value={newMessageBody}
                         onChange={ onNewMessageChanged }/></div>
          <div><button onClick={ onSendMessageClick }>Send</button></div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs;