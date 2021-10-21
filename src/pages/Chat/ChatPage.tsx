import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Avatar, Button, Input } from 'antd';
import { useFormik } from 'formik';

export type TChatMessage = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ws = new WebSocket( 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' )

export default function ChatPage(): JSX.Element {
  return (
    <div>
      <Chat/>
    </div>
  );
}

function Chat(): JSX.Element {

  return (
    <>
      <Messages/>
      <AddMessageForm/>
    </>
  )
}

function Messages(): JSX.Element {

  const [ messages, setMessages ] = useState<Array<TChatMessage>>( [] )

  useEffect( () => {
    ws.addEventListener( 'message', (e: MessageEvent) => {
      let newMessages = JSON.parse( e.data );
      setMessages( (oldMessages) => {
        return [ ...oldMessages, ...newMessages ]
      } );
    } )
  }, [] )

  return (
    <div style={ { height: '500px', overflowY: 'auto' } }>{ messages.map( (m) => {
      return <Message key={ m.message } message={ m }/>
    } ) }</div>
  );
}

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  message: TChatMessage
}

function Message({ message }: MessageProps): JSX.Element {

  return (
    <div>
      <Avatar size={ 64 } src={ message.photo }/><b>{ message.userName }</b>
      <br/>
      { message.message }
      <hr/>
    </div>
  );
}

function AddMessageForm(): JSX.Element {

  const formik = useFormik( {
    initialValues: {
      message: '',
    },
    onSubmit: (values,{resetForm}) => {
      ws.send(values.message);
      resetForm();
    },
  } );

  return (
    <>
      <form onSubmit={ formik.handleSubmit }>
        <Input.TextArea cols={ 50 } name={ 'message' } onChange={ formik.handleChange }
                        value={ formik.values.message }/>
        <Button htmlType={'submit'}>Send</Button>
      </form>
    </>
  );
}

