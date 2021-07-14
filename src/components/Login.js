import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { TopNavbar } from "./About";
import { login } from "../service/auth.service";
import { useHistory } from "react-router-dom";

export function Login() {
    const history = useHistory();
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
        login(userName, pwd).then(
            () => {
                history.push('/user');
            },
            (error) => {
                setErr('cannotlogin');
            }
        )
    }

    const checkUserName = (usr) => {
        setUserName(usr);
    }

    const checkPwd = (pwd) => {
        setPwd(pwd);
    }

    return (
        <>
        <TopNavbar/>
        <Container expand='sm' style={{marginTop: '10px'}}>
        <Form>
        <Form.Group className="mb-3">
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
        {
            err === 'cannotlogin' &&
            <Form.Text className="text-muted">
                    Username or password is invalid
            </Form.Text>
        }
        <Button variant="primary" type="submit" onClick={() => handleOnCLick()}>
            Login
        </Button>
        </Form>
        </Container>
        
        </>
    )
}