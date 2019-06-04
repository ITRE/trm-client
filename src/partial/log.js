import React from 'react';

const Log = (props) => (
  <div className="log">
    <h2>{props.date}</h2>
    <p>{props.message}</p>
  </div>
)

export default Log
