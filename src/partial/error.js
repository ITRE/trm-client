import React from 'react';
import logo from '../assets/logo.svg';
import ACTIONS from "../modules/action";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(ACTIONS.clearError())
});

const Error = (props) => (
  <div className="error">
    <div className="card">
      <div className="icon">
        <img src={logo} alt="Spinning Logo" />
      </div>
      <h2>{props.errorTitle}</h2>
      <p>{props.errorMessage}</p>
      <button className="cancel" onClick={props.clearError}>Okay</button>
    </div>
  </div>
)

export default connect(
  null,
  mapDispatchToProps
)(Error)
