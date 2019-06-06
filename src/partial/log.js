import React from 'react';

const Log = (props) => (
  <div className="log">
    <h2>{props.type}</h2>
    <h3>{props.staff}<br /><small>{props.date}</small></h3>
    <p>{props.message}</p>
  </div>
)

export default Log
