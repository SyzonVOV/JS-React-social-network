import React, { HTMLAttributes, useEffect } from 'react';
import { Avatar, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { TChatMessage } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer';
import { TAppState } from '../../redux/redux-store';

export default function ChatPage(): JSX.Element {
  return (
    <div>
      <Chat/>
    </div>
  );
}

function Chat(): JSX.Element {

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( startMessagesListening() )
    return () => {
      dispatch( stopMessagesListening() )
    }
  }, [] )

  return (
    <>
      <Messages/>
      <AddMessageForm/>
    </>
  )
}

function Messages(): JSX.Element {

  const messages = useSelector( (state: TAppState) => state.chat.messages )

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

  const dispatch = useDispatch()

  const formik = useFormik( {
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch( sendMessage( values.message ) )
      resetForm();
    },
  } );

  return (
    <>
      <form onSubmit={ formik.handleSubmit }>
        <Input.TextArea cols={ 50 } name={ 'message' } onChange={ formik.handleChange }
                        value={ formik.values.message }/>
        <Button htmlType={ 'submit' }>Send</Button>
      </form>
    </>
  );
}

