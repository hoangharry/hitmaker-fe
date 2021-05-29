import React from 'react';
import Toolbar from './Toolbar';
import Score from './Score';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class MainPage extends React.Component {
    render() {
        // const notes = 'C#5/q, B4, A4, G#4';
        const notes = '';
        return (
            <>
                <Toolbar/>
                <Score notesProp={notes}/>
            </>
        )
    }
}