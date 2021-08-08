import './App.css'
import { useEffect, useContext } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { InitDialog } from './components/Dialog'
import { MainPage } from './components/MainPage'
import { About } from './components/About'
import { SignUp } from './components/Signup'
import { Login } from './components/Login'
import { UserPage } from './components/UserPage'
import { SongInfoContext} from 'src/context/SongInfoContext'


function App() {
  const history = useHistory()
  const location = useLocation()
  const excludedPath = ['/signup', '/login']
  const name = sessionStorage.getItem('name')
  const {song} = useContext(SongInfoContext)
  const isLogin = name !== 'undefined' && name !== null

  useEffect(() => {
    if (isLogin && location.pathname === '/song' && song.length === 0) {
      history.push('/init')
    } else {
      if (!isLogin && !excludedPath.includes(location.pathname)) {
        history.push('/')
      }
    }
    // if (!isLogin && !excludedPath.includes(location.pathname)) {
    //   history.push('/')
    // }
  }, [])

  return (
    <Switch>
      <Route exact path='/'>
        <About/>
      </Route>
      <Route path='/signup'>
        <SignUp/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/init'>
        <InitDialog/>
      </Route>
      <Route path='/song'>
        <MainPage/>
      </Route>
      <Route path='/user'>
        <UserPage/>
      </Route>
    </Switch>
  )
}

export default App
