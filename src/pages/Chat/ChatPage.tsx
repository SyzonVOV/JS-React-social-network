import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
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
  const isWSConnected = useSelector( (state: TAppState) => state.chat.status );
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( startMessagesListening() )
    return () => {
      dispatch( stopMessagesListening() )
    }
  }, [] )

  return (
    <>
      { isWSConnected === 'error' && <div><h2>Some error occurred. Please refresh the page</h2></div> }
      <Messages/>
      <AddMessageForm/>
    </>
  )
}

function Messages(): JSX.Element {

  const messages = useSelector( (state: TAppState) => state.chat.messages )
  const messagesAnchorRef = useRef<HTMLDivElement>( null );
  const [ isAutoScroll, setIsAutoScroll ] = useState( true );


  useEffect( () => {
    if ( isAutoScroll ) {
      messagesAnchorRef.current?.scrollIntoView( { behavior: 'smooth', block: 'end', inline: 'nearest' } )
    }
  }, [ messages ] )

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

    const element = e.currentTarget;
    if ( Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) ) {
      !isAutoScroll && setIsAutoScroll( true )
    } else {
      isAutoScroll && setIsAutoScroll( false )
    }

  }

  return (
    <div style={ { height: '500px', overflowY: 'auto' } }
         onScroll={ scrollHandler }>
      { messages.map( m => <MemoizedMessage key={ m.message + m.userName } message={ m }/> ) }
      <div ref={ messagesAnchorRef }></div>
    </div>
  );
}

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  message: TChatMessage
}

const MemoizedMessage = React.memo( Message )

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
  const isWSConnected = useSelector( (state: TAppState) => state.chat.status );

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
        <Button disabled={ isWSConnected === 'pending' } htmlType={ 'submit' }>Send</Button>
      </form>
    </>
  );
}

