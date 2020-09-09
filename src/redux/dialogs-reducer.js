const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
  dialogs: [
    {id: 1, name: 'Vovan'},
    {id: 2, name: 'Dymych'},
    {id: 3, name: 'Serg'},
    {id: 6, name: 'Sveta'},
    {id: 7, name: 'Olga'},
    {id: 8, name: 'Dasha'},
  ],

  messages: [
    {id: 1, message: 'Hi!!!!'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Wie gehts es dir?'},
    {id: 4, message: 'Wie heißt du?'},
    {id: 5, message: 'Guten Tag!'},
  ],

  newMessageBody: "Hello!",
};

const dialogsReducer = (state = initialState, action) => {
  /*
    let stateCopy;

    switch (action.type) {
      case UPDATE_NEW_MESSAGE_BODY:
        stateCopy = {
          ...state,
        };
        stateCopy.newMessageBody = action.body;
        return stateCopy;

      case SEND_MESSAGE:
        let body = state.newMessageBody;
        stateCopy = {
          ...state,
          newMessageBody: '',
          messages: [...state.messages, {id: 6, message: body}]
        };
        return stateCopy;
  */

  switch (action.type) {

    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body,
      };

    case SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, {id: 6, message: body}]
      };

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({type: SEND_MESSAGE,});

export const updateNewMessageBodyCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text,
  }
};

export default dialogsReducer;