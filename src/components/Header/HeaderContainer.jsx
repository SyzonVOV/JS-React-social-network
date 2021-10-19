import React from "react";
import HeaderStyle from "./HeaderStyle";
import { connect } from "react-redux";
import { Thunks } from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

  render () {
  return (
      <HeaderStyle {...this.props}/>
  )}
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, {
  handleLogout: Thunks.logoutUser,
} )(HeaderContainer);