import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthCheck = (WrappedComponent) => {
  class WithRedirect extends React.Component {
    render() {
      if ( !this.props.isAuth ) return <Redirect to='/login'/>;

      return <WrappedComponent { ...this.props }/>
    }
  }
  WithRedirect.displayName = `WithRedirect(${getDisplayName(WrappedComponent)})`;

  let WithAuthCheckComponent = connect(mapStateToPropsForRedirect)(WithRedirect);

  return WithAuthCheckComponent;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}