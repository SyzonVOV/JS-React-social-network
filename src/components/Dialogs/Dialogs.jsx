import React from "react";
import style from "./Dialogs.module.css";

function Dialogs() {
  return (
    <div className={style.dialogs}>
      <div className={style.header}><p>Dialogs</p></div>
      <div className={style.dialogsUsers}>
        <div className={style.dialog}>
          Dimych
        </div>
        <div className={style.dialog}>
          Andrey
        </div>
        <div className={style.dialog}>
          Serg
        </div>
        <div className={style.dialog}>
          Anton
        </div>
        <div className={style.dialog}>
          Galia
        </div>
        <div className={style.dialog}>
          Svieta
        </div>
        <div className={style.dialog}>
          Gena
        </div>
      </div>
      <div className={style.messagesUser}>
        <div className={style.message}>Hi</div>
        <div className={style.message}>How are you?</div>
        <div className={style.message}>Wie gehts es dir?</div>
        <div className={style.message}>Wie heißt du?</div>
        <div className={style.message}>Good morning!!!</div>
        <div className={style.message}>Guten Tag!</div>
        <div className={style.message}>Where have you been?</div>
      </div>
    </div>
  )
}

export default Dialogs;