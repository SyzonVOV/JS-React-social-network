import React, { useState } from 'react';
import Loader from '../../common/Loader';
import ProfileStatusMessage from './ProfileStatusMessage';
import backgroundIMG from '../../../assets/images/1282257.jpg';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { checkObjHasTrueValues } from '../../../utils/helpers';
import { profileAPI } from '../../../api/profileAPI';


function ProfileInfo(props) {

  const [showEditProfileForm, setShowEditProfileForm] = useState(false);

  const handleDownloadFile = (e) => {
    if ( e.target.files.length ) {
      props.downloadPhoto(e.target.files[0]);
    }
  };

  if ( !props.profile ) return <Loader/>;

  return (
    <div>
      <div>
        <img src={ backgroundIMG } alt="landing" width="100%"/>
      </div>
      <div>
        <div>
          <label htmlFor="image">
            { props.isOwner && <input type={ 'file' } name="image" id="image" style={ { display: 'none' } }
                                      onChange={ handleDownloadFile }/> }
            <img src={ props.profile.photos.large || props.profile.photoUrl } className="landing__avatar" alt="user"/>
          </label>
        </div>
        <ProfileStatusMessage status={ props.status } handleUpdateStatus={ props.handleUpdateStatus }/>

        { showEditProfileForm && <ProfileDetailsUpdateForm profile={ props.profile }
                                                           getUserProfile={ props.getUserProfile }
                                                           authUserID={ props.authUserID }
                                                           showForm={ setShowEditProfileForm }/> }

        { !showEditProfileForm && <ProfileDetails profile={ props.profile }
                                                  isOwner={ props.isOwner }

                                                  showForm={ setShowEditProfileForm }/> }
      </div>
    </div>
  );
}

// -------------- Additional components --------------------------

function ProfileDetails(props) {
  const {
    profile: {
      lookingForAJob, lookingForAJobDescription, aboutMe, fullName, contacts,
    }, showForm, isOwner,
  } = props;
  return (
    <div>
      <div><b>Full name</b> { fullName }</div>
      <div><b>Looking for a job:</b> { lookingForAJob ? 'Yes, sure!' : 'No, thanks, I\'ve got!' }</div>

      { lookingForAJob &&
      <div>
        <b>I want to be: </b>{ lookingForAJobDescription }
      </div> }

      <div><b>About me: </b> { aboutMe }</div>

      { checkObjHasTrueValues(contacts)
      && <div><b>Contacts: </b>
        <div className="profile-contacts__container">
          { Object.keys(contacts).map(key => <ContactInfo key={ key } contactTitle={ key }
                                                          contactValue={ contacts[key] }/>) }
        </div>
      </div> }

      { isOwner && <button className="button--submit" onClick={ () => {
        showForm(true);
      } }>Update Profile
      </button> }
    </div>);
}

function ProfileDetailsUpdateForm(props) {
  const {
    profile: {
      lookingForAJob, lookingForAJobDescription, aboutMe, contacts, fullName,
    }, showForm, getUserProfile, authUserID,
  } = props;

  return <div>
    <h2>Change your profile data</h2>
    <Formik
      initialValues={ {
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        fullName,
        contacts,
      } }

      // validationSchema={ SignupSchema }

      onSubmit={ async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        try {
          const result = await profileAPI.updateProfileInfo(values);
          if ( result.resultCode === 0 ) {
            getUserProfile(authUserID);
            showForm(false);
          }
          let errMessage = { errorValidFromServ: 'Could you check your form, you have some errors' };
          result.messages.forEach(errM => {
            let index = errM.substring(errM.lastIndexOf('>') + 1, errM.lastIndexOf(')')).toLowerCase();
            errMessage = { ...errMessage, contacts: { ...errMessage.contacts, [index]: errM } };
          });
          setErrors(errMessage);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }
      }


    >
      { ({ isSubmitting, errors }) => {
        console.log(errors);
        return (
          <Form className={ 'login-form' }>
            <label htmlFor="fullName">Full Name: </label>
            <Field type="text" name="fullName" placeholder="Full name"/>

            <label htmlFor="lookingForAJob">Looking for a job: </label>
            <Field type="checkbox" name="lookingForAJob"/>

            <label htmlFor="lookingForAJobDescription">My job descriptions: </label>
            <Field component="textarea" rows="5" cols="50" name="lookingForAJobDescription"
                   placeholder="Job description"/>
            <ErrorMessage className={ 'login-form__message-error' } name="lookingForAJobDescription" component="div"/>

            <label htmlFor="aboutMe">About me: </label>
            <Field component="textarea" rows="5" cols="50" name="aboutMe" placeholder="About me"/>
            <ErrorMessage className={ 'login-form__message-error' } name="aboutMe" component="div"/>
            <div className="profile-contacts">
              <h3>Contacts</h3>
              <div className="profile-contacts__container">
                { Object.keys(contacts).map(key => <div key={ key }>
                  <label htmlFor={ `contacts.${ key }` }>{ key }: </label>
                  <Field type="text" name={ `contacts.${ key }` } placeholder="Your link"/>
                  <ErrorMessage className={ 'login-form__message-error' } name={ `contacts.${ key }` } component="div"/>
                </div>) }
              </div>
            </div>

            <ErrorMessage className={ 'login-form__message-error' } name="errorValidFromServ" component="div"/>

            <button className="button--submit" type="submit" disabled={ isSubmitting }>
              Submit
            </button>
            <button className="button--submit" type="button" disabled={ isSubmitting } onClick={ () => {
              showForm(false);
            } }>
              Cancel
            </button>
          </Form>
        );
      } }
    </Formik>
  </div>;
}

function ContactInfo({ contactTitle, contactValue }) {
  return <>
    { contactValue && <div><b>{ contactTitle }: </b>{ contactValue }</div>
    }</>;
}

export default ProfileInfo;