import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useContext } from 'react'
import { SongInfoContext } from '../context/SongInfoContext'
import logo from 'src/pictures/logo.png'
import { logout } from '../service/auth.service'

export function About() {
  const history = useHistory()
  const { nameUsr } = useContext(SongInfoContext)
  return (
    <>
      <TopNavbar/>
      <h5>This is about page</h5>
      {
        nameUsr !== '' ?
          <Button onClick={() => history.push('/init')} style={{margin: '10px'}}>
                Create new song
          </Button> : null
      }
        
    </>
  )
}

export function TopNavbar() {
  const history = useHistory()
  const { handleSong } = useContext(SongInfoContext)
  // console.log('nameusr', nameUsr)
  let navlinks
  var nameUsr = sessionStorage.getItem('name')
  console.log(nameUsr)
  const onLogout = () => {
    handleSong([])
    logout()
    history.push('/')
  } 

  if (nameUsr !== undefined && nameUsr !== null) {
    navlinks = <Nav>
      <Nav.Link style={{color: '#e3cf1e'}} onClick ={() => history.push('/user')}>{nameUsr}</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick ={() => onLogout()}>Log out</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick ={() => history.push('/')}>About</Nav.Link>
    </Nav>
  } else {
    navlinks = <Nav>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick={() => history.push('/login')}>Log in</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick={() => history.push('/signup')}>Sign up</Nav.Link>
      <Nav.Link style={{color: '#e3cf1e'}} className="custom-nav-link" onClick={() => history.push('/')}>About</Nav.Link>
    </Nav>
  }
  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="HIT MAKER" className="hit-maker-logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {navlinks}
        </Navbar.Collapse>
                
      </Container>
    </Navbar>
  )
}