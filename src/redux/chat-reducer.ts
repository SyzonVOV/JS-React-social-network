import { TChatMessage } from '../types';
import { ActionsTypes, TAppState } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { chatAPI, TWSConnectionStatus } from '../api/chatAPI';
import { Dispatch } from 'redux';


export type TInitState = {
  messages: Array<TChatMessage>
  status: TWSConnectionStatus
}
type TActions = ActionsTypes<typeof chatAC>
type TThunk = ThunkAction<void, TAppState, unknown, TActions>


let initialState: TInitState = {
  messages: [],
  status: 'pending',
};

const chatReducer = (state = initialState, action: TActions): TInitState => {

  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [ ...state.messages, ...action.payload.messages ],
      };
    case 'chat/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }

};

export const chatAC = {
  messagesReceived: (messages: Array<TChatMessage>) => ({
    type: 'chat/MESSAGES_RECEIVED', payload: { messages },
  } as const),
  statusChanged: (status: TInitState['status']) => ({
    type: 'chat/STATUS_CHANGED', payload: { status },
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
let _statusChangedHandler: ((status: TWSConnectionStatus) => void) | null = null
const statusChangedHandLerCreator = (dispatch: Dispatch) => {
  if ( _statusChangedHandler === null ) {
    _statusChangedHandler = (status) => {
      dispatch( chatAC.statusChanged( status ) )
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): TThunk => (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe( 'messages-received', newMessageHandlerCreator( dispatch ) )
  chatAPI.subscribe( 'status-changed', statusChangedHandLerCreator( dispatch ) )
};

export const stopMessagesListening = (): TThunk => (dispatch) => {
  chatAPI.unsubscribe( 'messages-received', newMessageHandlerCreator( dispatch ) );
  chatAPI.unsubscribe( 'status-changed', statusChangedHandLerCreator( dispatch ) );
  chatAPI.stop();
};

export const sendMessage = (message: string): TThunk => () => {
  chatAPI.sendMessage( message )
};
export default chatReducer;