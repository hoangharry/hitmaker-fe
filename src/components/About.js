import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export function About() {
    const history = useHistory();
    return (
        <>
        <h5>This is about page</h5>
        <Button onClick={() => history.push('/')}>
            Create new song
        </Button>
        
        </>
    )
}