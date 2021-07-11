import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { SongInfoContext } from '../context/SongInfoContext';

export function About() {
    const history = useHistory();
    return (
        <>
        <TopNavbar/>
        <h5>This is about page</h5>
        <Button onClick={() => history.push('/')}>
            Create new song
        </Button>
        
        </>
    )
}

export function TopNavbar() {
    const history = useHistory();
    const { isLogin } = useContext(SongInfoContext);
    let navlinks;
    if (isLogin) {
        navlinks = <Nav>
            <Nav.Link>username</Nav.Link>
            <Nav.Link>Log out</Nav.Link>
        </Nav>
    } else {
        navlinks = <Nav>
            <Nav.Link onClick={() => history.push("/")}>Use as guest</Nav.Link>
            <Nav.Link onClick={() => history.push("/login")}>Log in</Nav.Link>
            <Nav.Link onClick={() => history.push("/signup")}>Sign up</Nav.Link>
        </Nav>
    }
    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>HIT MAKER</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {navlinks}
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    )
}