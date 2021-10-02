import React from 'react';
import {ErrorMessage, Field, FieldProps, Form, Formik, FormikHelpers} from 'formik';
import { Thunks } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import {TAppState} from "../../redux/redux-store";
import {LoginProps} from "./Login.types";
import {authAPI} from "../../api/authAPI";

//TODO: style error message and add some space after input, so there was no jumping if error
//TODO: reset setError after user actions

interface IFormikValue{
  email: string
  password: string
  remember: boolean
  captcha: string
  captchaUrl: string | null
  errorValidFromServ?: string
}

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Password too Short!')
    .max(30, 'Password too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

function validateCaptcha(value: number): string | null {
  let error = null;
  if ( !value ) {
    error = 'Required';
  }
  return error;
}

const Login = (props: LoginProps): JSX.Element => {
  const { isAuth, loginUser, captchaUrl, setCaptcha } = props;

  if ( isAuth ) {
    return <Redirect to={ 'profile' }/>;
  }

  return <>
    <h1>Login</h1>
    <Formik
      initialValues={ { email: '', password: '', remember: false, captcha: '', captchaUrl } }

      validationSchema={ SignupSchema }

      onSubmit={ async (values, { setSubmitting, resetForm, setErrors }: FormikHelpers<IFormikValue>) => {
        const result = await authAPI.login(values.email, values.password, values.remember, values.captcha);
        if ( result.resultCode === 0 ) {
          loginUser();
          setSubmitting(false);
          resetForm();
        } else if ( result.resultCode === 10 ) {
          setCaptcha()
        }
        setErrors({ errorValidFromServ: result.messages[0] });
      } }
    >
      { ({ isSubmitting, errors: { errorValidFromServ } }) => {
        return (
          <Form className={ 'login-form' }>
            <Field type="email" name="email" placeholder="Your email"/>
            <ErrorMessage className={ 'login-form__message-error' } name="email" component="div"/>
            <Field type="password" name="password" placeholder="Password"/>
            <ErrorMessage className={ 'login-form__message-error' } name="password" component="div"/>
            <label>
              <Field type="checkbox" name="remember"/>
              Remember me
            </label>
            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && <Field name="captcha" validate={validateCaptcha}>
              { ({ field, meta }: FieldProps) => {
                return <div>
                  <input type="text" placeholder="Captcha" { ...field } autoComplete="off"/>
                  { meta.touched && meta.error && (
                    <div className="login-form__message-error">{ meta.error }</div>
                  ) }
                </div>
              } }
            </Field>}

            { errorValidFromServ }
            <button className="button--submit" type="submit" disabled={ isSubmitting }>
              Submit
            </button>
          </Form>
        );
      } }
    </Formik>
  </>;
};

const mapStateToProps = (state: TAppState) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps,
  { loginUser: Thunks.getAuthUserData,
    setCaptcha: Thunks.getCaptcha,
  })(Login);