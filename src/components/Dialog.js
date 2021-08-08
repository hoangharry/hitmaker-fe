import { useContext, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { SongInfoContext } from '../context/SongInfoContext'
import Button from 'src/components/common/Button'

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
  const [timeSignature, setTimeSignature] = useState('4/4')
  const [enableContine, setEnableContinue] = useState(false)
  const [isShow, setIsShow] = useState(true) 
  const [title, setTitle] = useState('')
  const [keySn, setKeySn] = useState('C')
  const { handleSong, setSongInfo } = useContext(SongInfoContext)
  const history = useHistory()
  if (sessionStorage.getItem('token') === undefined) {
    history.push('/login')
  }

  const onHide = () => {
    handleSong([{keySignature: keySn, saveName: title, streamParts: [], timeSignature: timeSignature}])
    setSongInfo(title, timeSignature, keySn)
    setIsShow(false)
    history.push('/song')
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
    setEnableContinue(e.target.value.length > 0)
  }

  const onAboutClick = () => {
    setIsShow(false)
    history.push('/')
  }
  const keySignatures = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'B-', 'E-', 'A-', 'D-', 'G-', 'C-']
    
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show = {isShow}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Tạo bài hát
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="titleId">
            <Form.Label>Tên bài hát</Form.Label>
            <Form.Control type="text" placeholder="Vui lòng nhập tên bài hát" onChange={onTitleChange}></Form.Control> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="timeSnId">
            <Form.Label>Số chỉ nhịp</Form.Label>
            <Form.Control as="select" custom onChange={(e) => setTimeSignature(e.target.value)}>
              <option value='4/4'>4/4</option>
              <option value='3/4'>3/4</option>
              <option value='2/4'>2/4</option>  
            </Form.Control> 
                
          </Form.Group>
          <Form.Group className="mb-3" controlId="keySnId">
            <Form.Label>Giọng/ tông</Form.Label>
            <Form.Control as="select" custom onChange={(e) => setKeySn(e.target.value)}>
              { keySignatures.map((v, idx) => {
                return <option key={idx}>{v}</option>
              })}
            </Form.Control> 
                            
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} isEnable={enableContine}>Tiếp tục</Button>
        <Button onClick={() => onAboutClick()}>Quay lại</Button>
      </Modal.Footer>
    </Modal>
  )
}


export function NoInternetDialog(props) {

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
          No internet connection! Please check your connection!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export function ErrorDialog(props) {

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
          Something went wrong! Please try again!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}