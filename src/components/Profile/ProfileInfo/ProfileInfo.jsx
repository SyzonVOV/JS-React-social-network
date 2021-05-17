import React from 'react';
import Loader from '../../common/Loader';
import ProfileStatusMessage from './ProfileStatusMessage';
import backgroundIMG from '../../../assets/images/1282257.jpg';


function ProfileInfo(props) {

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
      </div>
    </div>
  );
}

export default ProfileInfo;