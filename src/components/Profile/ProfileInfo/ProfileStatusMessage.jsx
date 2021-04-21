import React, { Component } from 'react';

class ProfileStatusMessage extends Component {
  state = {
    editMode: false
  }

  handleActivateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  handleDeactivateEditMode = () => {
    this.setState({
      editMode: false
    })
  }

  handleFocus = (event) => {
    event.target.select();
  }

  render() {
    return (
      <div>
        Status:
        { this.state.editMode
          ? <div><input onFocus={this.handleFocus}  defaultValue={ this.props.status }/>
        <button onClick={this.handleDeactivateEditMode}>Save</button></div>
          : <div><span onDoubleClick={this.handleActivateEditMode}>{ this.props.status }</span></div> }


      </div>
    );
  }
}

export default ProfileStatusMessage;
