
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SongInfoContext } from './context/SongInfoContext';
import { useContext } from 'react';
import { InitDialog } from './components/Dialog'
import MainPage from './components/MainPage'
import { About } from './components/About'

function App() {
  const { input } = useContext(SongInfoContext)
  console.log(input)
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {  input.author === '' ? <InitDialog/> : <MainPage/>}           
            
          </Route>
          <Route path='/about'>
            <About/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
