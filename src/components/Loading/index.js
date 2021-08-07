import React from 'react'
import loadingIcon from 'src/pictures/loading-music.gif'
import './index.css'

const Loading = ({className}) => { 
  return (
    <div className="loading-background">
      <div className={`loading-container ${className}`}>
        <img src={loadingIcon} />
      </div>
    </div>
  )
}

export default Loading