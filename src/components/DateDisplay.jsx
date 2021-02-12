import React from 'react'
import './DateDisplay.module.scss';

const DateDisplay = () => {
  const date = new Date();
  return (
    <h3>
      {date.toUTCString()}
    </h3>
  )
}

export default DateDisplay;