import React, { Component } from 'react';

class ProfileStatusMessage extends Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ( prevProps.status !== this.props.status ){
      this.setState({
        status: this.props.status,
      })
    }
  }

  handleActivateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  handleStatusChange = ({ currentTarget: { value } }) => {
    this.setState({
      status: value,
    })
  }

  handleDeactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.handleUpdateStatus(this.state.status)
  }

  handleFocus = (event) => {
    event.target.select();
  }

  render() {
    const { editMode, status } = this.state;
    return (
      <div>
        <b>Status: </b>
        { editMode
          ? <><input onFocus={ this.handleFocus } onChange={ this.handleStatusChange } defaultValue={ status }/>
            <button onClick={ this.handleDeactivateEditMode }>Save</button>
          </>
          : <><span onDoubleClick={ this.handleActivateEditMode }>{ status || 'No status'}</span></> }


      </div>
    );
  }
}

export default ProfileStatusMessage;
