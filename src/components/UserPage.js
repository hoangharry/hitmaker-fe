import { useEffect, useState } from "react";
import { CardDeck, Card, Button } from "react-bootstrap";
import { TopNavbar } from "./About";
import { getSavedSongs } from '../service/user.service'
import { useHistory } from "react-router-dom";

export function UserPage() {
    const history = useHistory();
    const [songs, setSongs] = useState([]);
    // const getSavedSongs = () => {
    //     return [{time: 9, name: 'a'}, {time: 10, name: 'hitit'}, {time: 1, name: 'a'}, {time: 2, name: 'wwww'}, {time: 2, name: 'wwww'}, {time: 2, name: 'awwww'}]
    // }

    useEffect(() => {
        setSongs(getSavedSongs('hhhh'));
    }, [])
    
    
    console.log('songnenenen', songs);
    const cardDeckArr = [];
    for (let i = 0; i < songs.length; i+=4) {
        let cards = [];
        let lim;
        if (i + 4 < songs.length) {
            lim = 4;
        } else {
            lim = songs.length - i;
        }
        for (let j= 0; j < lim; j++) {
            console.log('songsss', songs[i+j]);
            cards.push(<Card bg="secondary" key={i+j} text='white' style={{maxWidth: '430px'}} className='mb-2'>
            <Card.Body>
            <Card.Title>{songs[i+j].name}</Card.Title>
            <Card.Text>
                Time: {songs[i+j].time}
            </Card.Text>
            <Button variant='warning'>Edit song</Button>
            </Card.Body>
        </Card>)
        }
        cardDeckArr.push(<CardDeck style={{padding: '10px'}}>
            {cards.map((v) => {
                return v;
            })}
        </CardDeck>)
    }

    return (
        <>
            <TopNavbar/>
            <Button onClick={() => history.push('/')}>Create new song</Button>
            {cardDeckArr.map((v) => {return v;})}
        </>
    );
}