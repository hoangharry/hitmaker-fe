
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { InitDialog } from './components/Dialog'
import MainPage from './components/MainPage'
import { About } from './components/About'
import { SignUp } from './components/Signup';
import { Login } from './components/Login';
import { UserPage } from './components/UserPage';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          {/* <Route exact path='/'>
            {  input.author === '' ? <InitDialog/> : <MainPage/>}           
            
          </Route>
          <Route path='/about'>
            <About/>
          </Route> */}
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
      </BrowserRouter>
  );
}

export default App;
