import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Thunks } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import * as Yup from 'yup';

//TODO: style error message and add some space after input, so there was no jumping if error

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Password too Short!')
    .max(30, 'Password too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


const Login = (props) => {
  return <div>
    <h1>Login</h1>
    <Formik
      initialValues={ { email: '', password: '', remember: false } }

      validationSchema={ SignupSchema }

      onSubmit={ (values, { setSubmitting }) => {
        props.loginUser(values.email, values.password, values.remember);
        setSubmitting(false);
      } }
    >
      { ({ isSubmitting }) => (
        <Form className={ 'login-form' }>
          <Field type="email" name="email" placeholder="Login"/>
          <ErrorMessage className={ 'login-form__message-error' } name="email" component="div"/>
          <Field type="password" name="password" placeholder="Password"/>
          <ErrorMessage className={ 'login-form__message-error' } name="password" component="div"/>
          <label>
            <Field type="checkbox" name="remember"/>
            Remember me
          </label>
          <button className="button--submit" type="submit" disabled={ isSubmitting }>
            Submit
          </button>
        </Form>
      ) }
    </Formik>
  </div>;
};


export default connect(null, { loginUser: Thunks.loginUser })(Login);