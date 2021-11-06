import { TChatMessage } from '../types';

export type TWSConnectionStatus = 'pending' | 'ready' | 'error';
type TMessagesSubscribers = (messages: Array<TChatMessage>) => void;
type TStatusSubscribers = (status: TWSConnectionStatus) => void;
type TAllSubscribers =
  TMessagesSubscribers |
  TStatusSubscribers;

type TEventsNames = 'messages-received' | 'status-changed';

const subscribers: Record<TEventsNames, Array<any>> = {
  'messages-received': [],
  'status-changed': [],
}
let ws: WebSocket | null = null

function closeHandler() {
  console.warn( 'WS is CLOSED' );
  notifySubscribersAboutStatus( 'pending' )
  setTimeout( createChanel, 3000 );
}

function openHandler() {
  console.warn( 'WS is OPENED' );
  notifySubscribersAboutStatus( 'ready' )
}

function errorHandler() {
  console.warn( 'WS has some ERROR' );
  notifySubscribersAboutStatus( 'error' )
}

function notifySubscribersAboutStatus(status: TWSConnectionStatus) {
  subscribers['status-changed'].forEach( s => s( status ) )
}

function cleanup() {
  ws?.removeEventListener( 'close', closeHandler )
  ws?.removeEventListener( 'message', messageHandler )
  ws?.removeEventListener( 'open', openHandler )
  ws?.removeEventListener( 'error', errorHandler )
}

function createChanel() {
  cleanup()
  ws?.close()
  ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
  notifySubscribersAboutStatus( 'pending' )
  ws.addEventListener( 'close', closeHandler )
  ws.addEventListener( 'message', messageHandler )
  ws.addEventListener( 'open', openHandler )
  ws.addEventListener( 'error', errorHandler )
}

function messageHandler(event: MessageEvent) {
  const newMessages = JSON.parse( event.data )
  subscribers['messages-received'].forEach( s => s( newMessages ) )
}

export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanup()
    ws?.close();
  },
  subscribe(event: TEventsNames, callback: TAllSubscribers) {
    subscribers[event].push( callback )
    return () => {
      subscribers[event] = subscribers[event].filter( s => s !== callback )
    }
  },
  unsubscribe(event: TEventsNames, callback: TAllSubscribers) {
    subscribers[event] = subscribers[event].filter( s => s !== callback )
  },
  sendMessage(message: string) {
    ws?.send( message )
  },
}