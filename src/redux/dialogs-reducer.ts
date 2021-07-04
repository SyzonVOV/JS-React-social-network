const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

export type TInitialState = typeof initialState

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
};

type TActions = | TSendMessageAC

const dialogsReducer = (state = initialState, action: TActions): TInitialState => {
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

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: Date.now(), message: action.payload}],
            };

        default:
            return state;
    }
};

type TSendMessageAC = {
  type: typeof SEND_MESSAGE
  payload: string
}

export const sendMessageCreator = (payload: string): TSendMessageAC => ({type: SEND_MESSAGE, payload});


export default dialogsReducer;