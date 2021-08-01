import React from 'react'
import './index.css'

const Button = ({
  children,
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
      {children}
    </button>
  )
}

export default Button