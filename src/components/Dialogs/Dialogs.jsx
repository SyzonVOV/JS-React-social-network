import React from 'react';
import style from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Button } from 'antd';
import { Input } from 'antd';


function Dialogs(props) {

  let state = props.dialogsPage;

  let dialogs = state.dialogs;
  let messages = state.messages;

  let dialogElements = dialogs.map(dialog => <DialogItem userName={ dialog.name } key={ dialog.id } id={ dialog.id }/>);
  let messageElements = messages.map(message => <Message message={ message.message } key={ message.id }/>);

  return (
    <div className={ style.dialogs }>
      <div className={ style.header }><p>Dialogs</p></div>
      <div className={ style.dialogsUsers }>
        { dialogElements }
      </div>
      <div className={ style.messagesUser }>
        <div>{ messageElements }</div>
        <div>
          <TextAreaForm sendMessage={ props.sendMessage }/>
        </div>
      </div>
    </div>
  );
}

function DialogItem(props) {
  return (
    <div className={ style.dialog }>
      <NavLink to={ `/dialogs/${ props.id }` }>{ props.userName }</NavLink>
    </div>
  );
}

function Message(props) {
  return (
    <div className={ style.message }>{ props.message }</div>
  );
}

const TextAreaForm = (props) => (
  <div className="form-container">
    <h3>Enter your beautiful message</h3>

    <Formik
      initialValues={ { message: '' } }
      onSubmit={ ({ message }, actions) => {
        props.sendMessage(message);
        actions.setSubmitting(false);
        actions.resetForm();
      } }
    >
      { ({ isSubmitting }) => (
        <Form>
          <Field name="message" >
            {({field}) => (
              <Input.TextArea  allowClear showCount maxLength={150} placeholder="Enter your message here." {...field}/>
            )}
          </Field>

          <div>
            <Button type="primary" htmlType="submit" disabled={ isSubmitting }>
              Save
            </Button>
          </div>
        </Form>
      ) }
    </Formik>
  </div>
);

export default Dialogs;