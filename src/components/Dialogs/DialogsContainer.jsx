import React from "react";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { withAuthCheck } from "../_HOC/AuthRedirectHOC";


/*
function DialogsContainer(props) {

  let dialogsPage = props.store.getState().dialogsPage;

  const onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  const onNewMessageChanged = (body) => {
    props.store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Dialogs updateNewMessageBody={ onNewMessageChanged }
             sendMessage={onSendMessageClick}
             dialogsPage={dialogsPage}/>
  )
}
*/



let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body))
    },
    sendMessage: () => {
      dispatch(sendMessageCreator())
    },
  }
};

let WithAuthCheckComponent = withAuthCheck(Dialogs);

const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(WithAuthCheckComponent)

export default SuperDialogsContainer;