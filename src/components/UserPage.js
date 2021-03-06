import { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { TopNavbar } from './About'
import { useHistory } from 'react-router-dom'
import { SongInfoContext } from '../context/SongInfoContext'

export function UserPage() {
  const history = useHistory()
  const { song } = useContext(SongInfoContext)
  if (sessionStorage.getItem('token') === undefined) {
    history.push('/login')
  }
  const onEditSong = () => {
    history.push({ pathname: '/song'})
  }
  let show
  if (song.length === 0) {
    show = <Button onClick={() => history.push('/init')} style={{margin: '10px'}}>Create new song</Button>
  } else {
    show =  <Card
      bg="warning"
      text="black"
      style={{width: '18rem', margin: '10px'}}
      className="mb-2"
      onClick={() => onEditSong()}
    >
      <Card.Body>
        <Card.Title>{song[0].saveName}</Card.Title>
      </Card.Body>
    </Card>
  }

  return (
    <>
      <TopNavbar/>
      {show}
            
    </>
  )
}