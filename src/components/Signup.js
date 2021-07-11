import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { TopNavbar } from "./About";

export function SignUp() {
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState('');
    const handleOnCLick = () => {
        if (userName === '') {
            setErr('usr');
            return;
        }
        if (pwd === '') {
            setErr('pwd');
            return;
        }

    }

    const checkUserName = (usr) => {
        if (usr.length === 0) {
            setErr('usr');
        }
        setUserName(usr);
    }

    const checkPwd = (pwd) => {
        if (pwd.length === 0) {
            setErr('pwd');
        }
        setPwd(pwd);
    }

    return (
        <>
        <TopNavbar/>
        <Container expand='sm' style={{marginTop: '10px'}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={(e) => checkUserName(e.target.value)} />
            {
               err === 'usr' && 
               <Form.Text className="text-muted">
                   Please enter username
               </Form.Text>
            }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => checkPwd(e.target.value)}/>
            {
                err === 'pwd' &&
                <Form.Text className="text-muted">
                    Please enter password
                </Form.Text>
            }
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => handleOnCLick()}>
            Sign up
        </Button>
        </Form>
        </Container>
        
        </>
        
    )
}