import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Thunks } from "../../redux/auth-reducer";
import { compose } from "redux";
import { connect } from "react-redux";

const Login = (props) => {
  return <div>
    <h1>Login</h1>
    <Formik
      initialValues={ { email: '', password: '', remember: false } }

      validate={ values => {
        const errors = {};
        if ( !values.email ) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if ( !values.password ) {
          errors.password = 'Required';
        }else if (values.password.length < 4) {
          errors.password = 'Password too short';
        }
        return errors;
      } }

      onSubmit={ (values, { setSubmitting }) => {

        props.loginUser(values.email, values.password, values.remember)
        setSubmitting(false);
/*
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
*/
      } }
    >
      { ({ isSubmitting }) => (
        <Form className={"login-form"}>
          <Field type="email" name="email" placeholder="Login"/>
          <ErrorMessage className={"login-form__message-error"} name="email" component="div"/>
          <Field type="password" name="password" placeholder="Password"/>
          <ErrorMessage name="password" component="div"/>
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
  </div>
}



const mapDispatchToProps = {
  loginUser: Thunks.loginUser,
}
export default compose(
  connect(null, mapDispatchToProps),
)(Login)