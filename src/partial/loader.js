import React from 'react';
import logo from '../assets/logo.svg';


const Loader = (props) => (
  <div className="loader">
    <div className="icon">
      <img src={logo} alt="Spinning Logo" />
    </div>
    <p>Loading...</p>
  </div>
)

export default Loader
