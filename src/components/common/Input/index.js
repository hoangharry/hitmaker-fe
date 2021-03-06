import React, { useState } from 'react'

import ToggleDisplayIcon from '../../../pictures/ToggleDisplayIcon'
import './index.css'

const InputField =  ({
  label,
  value,
  onChange,
  name = '',
  placeholder = '',
  className = '',
  type = 'password',
}) => {
  const [isDisplay, setDisplay] = useState(false)
  const toggleDisplay = () => {
    setDisplay(!isDisplay)
    console.log(type)
  }

  return (
    <div className={`input-field ${className}`}>
      <div className="label">{label}</div>
      <div className="input-wrapper">
        <input
          name={name}
          className="input"
          type={isDisplay ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></input>
        <ToggleDisplayIcon className="toggle-display" onClick={toggleDisplay} />
      </div>
    </div>
  )
}

export default InputField