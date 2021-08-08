import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SongInfoContextProvider } from './context/SongInfoContext'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <SongInfoContextProvider>
      <Router>
        <App />
      </Router>
    </SongInfoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)