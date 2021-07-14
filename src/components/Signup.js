import { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { TopNavbar } from "./About";
import { login, register } from "../service/auth.service";
import { useHistory } from "react-router";

const NotiPopup = (props) => {
    const history = useHistory();
    const handleOnClick = () => {
        props.onHide();
        history.push('/login');
    }
    return (
        <Modal
      {...props}
      size="small"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Notification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Successful registration! Please sign in!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleOnClick()}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}


export function SignUp() {
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState('');
    const [name, setName] = useState('');
    const handleOnCLick = () => {
        if (userName === '') {
            setErr('usr');
            return;
        }
        if (pwd === '') {
            setErr('pwd');
            return;
        }
        if (name === '') {
            setErr('name');
            return;
        }
        register(userName, pwd, name).then(
            (response) => {
                setShowModal(true);
            },
            (error) => {
                setErr('cannotsignup')
            }
        )

    }

    const checkName = (name) => {
        setName(name);
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
        <NotiPopup show={showModal}
        onHide={() => setShowModal(false)}/>
        <Container expand='sm' style={{marginTop: '10px'}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" onChange={(e) => checkName(e.target.value)} />
            {
               err === 'name' && 
               <Form.Text className="text-muted">
                   Please enter your name
               </Form.Text>
            }
        </Form.Group>
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
        {
            err === 'cannotsignup' &&
            <Form.Text className="text-muted">
                    The information you provide cannot use to register. Please edit your information!
                </Form.Text>
        }
        <Button variant="primary" type="submit" onClick={() => handleOnCLick()}>
            Sign up
        </Button>
        </Form>
        </Container>
        
        </>
        
    )
}