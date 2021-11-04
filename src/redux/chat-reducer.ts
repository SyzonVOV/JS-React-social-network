import { TChatMessage } from '../types';
import { ActionsTypes, TAppState } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { chatAPI } from '../api/chatAPI';
import { Dispatch } from 'redux';


export type InitStateType = {
  messages: Array<TChatMessage>
}
type TActions = ActionsTypes<typeof chatAC>
type TThunk = ThunkAction<void, TAppState, unknown, TActions>


let initialState: InitStateType = {
  messages: [],
};

const chatReducer = (state = initialState, action: TActions): InitStateType => {

  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [ ...state.messages, ...action.payload.messages ],
      };

    default:
      return state;
  }

};

export const chatAC = {
  messagesReceived: (messages: Array<TChatMessage>) => ({
    type: 'chat/MESSAGES_RECEIVED', payload: { messages },
  } as const),
}

// in oder to pass the same function to chatAPI for subscribing and unsubscribing
let _newMessageHandler: ((messages: Array<TChatMessage>) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if ( _newMessageHandler === null ) {
    _newMessageHandler = (messages) => {
      dispatch( chatAC.messagesReceived( messages ) )
    }
  }
  return _newMessageHandler
};

export const startMessagesListening = (): TThunk => (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe( newMessageHandlerCreator( dispatch ) )
};

export const stopMessagesListening = (): TThunk => (dispatch) => {
  chatAPI.unsubscribe( newMessageHandlerCreator( dispatch ) );
  chatAPI.stop();
};

export const sendMessage = (message: string): TThunk => () => {
  chatAPI.sendMessage( message )
};
export default chatReducer;