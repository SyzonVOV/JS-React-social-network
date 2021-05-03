import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthCheck } from '../_HOC/AuthRedirectHOC';
import { compose } from 'redux';


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
    sendMessage: (payload) => {
      dispatch(sendMessageCreator(payload))
    },
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthCheck
)(Dialogs)
