import { TChatMessage } from '../types';

type TSubscriber = (messages: Array<TChatMessage>) => void

let subscribers: Array<TSubscriber> = []
let ws: WebSocket | null = null

function closeHandler() {
  console.warn( 'WS is CLOSED' );
  setTimeout( createChanel, 3000 );
}

function createChanel() {
  ws?.removeEventListener( 'close', closeHandler )
  ws?.close()
  ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )
  ws.addEventListener( 'close', closeHandler )
  ws.addEventListener( 'message', messageHandler )
}

function messageHandler(event: MessageEvent) {
  const newMessages = JSON.parse( event.data )
  subscribers.forEach( s => s( newMessages ) )
}

export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribers = [];
    ws?.removeEventListener( 'close', closeHandler )
    ws?.removeEventListener( 'message', messageHandler )
    ws?.close();
  },
  subscribe(callback: TSubscriber) {
    subscribers.push( callback )
    return () => {
      subscribers = subscribers.filter( s => s !== callback )
    }
  },
  unsubscribe(callback: TSubscriber) {
    subscribers = subscribers.filter( s => s !== callback )
  },
  sendMessage(message: string) {
    ws?.send( message )
  },
}