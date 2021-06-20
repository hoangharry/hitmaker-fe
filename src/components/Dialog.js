import { useContext, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { SongInfoContext } from "../context/SongInfoContext";
export function ExceedNotesDialog(props) {

    return (
        <Modal
      {...props}
      size="small"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Notes exceed time!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export const InitDialog = () => {
    const [timeSignature, setTimeSignature] = useState('4/4');
    const [isShow, setIsShow] = useState(true) 
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const { handleInput } = useContext(SongInfoContext);
    const history = useHistory();
    const onHide = () => {
      if (author === '' || title === '') {
        return;
      }
      handleInput(author, title, timeSignature);
      setIsShow(false);
    }
    const onAboutClick = () => {
      setIsShow(false);
      history.push('/about');
    }
    
    return (
        <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show = {isShow}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Initial your song
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="titleId">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title of your song" onChange={(e) => setTitle(e.target.value)}></Form.Control> 
            </Form.Group>

            <Form.Group className="mb-3" controlId="authorId">
            <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setAuthor(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="timeSnId">
            <Form.Label>TimeSignature</Form.Label>
                <Form.Control as="select" custom onChange={(e) => setTimeSignature(e.target.value)}>
                  <option value='4/4'>4/4</option>
                  <option value='3/4'>3/4</option>
                  <option value='2/4'>2/4</option>  
                </Form.Control> 
                
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onHide()}>Create</Button>
        <Button onClick={() => onAboutClick()}>About</Button>
      </Modal.Footer>
    </Modal>
    )
}
