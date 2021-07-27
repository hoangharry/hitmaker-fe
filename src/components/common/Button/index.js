import React from 'react'
import './index.css'

const Button = ({
  label,
  onClick = () => {},
  isEnable = true,
  className = '',
    
}) => {
  return (
    <button 
      disabled={!isEnable}
      onClick={onClick}
      className={`shared-button ${className}`}
    >
      {label}
    </button>
  )
}

export default Button