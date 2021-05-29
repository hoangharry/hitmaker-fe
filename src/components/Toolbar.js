import React, { Component } from 'react';
import { PlayButton, AddButton, PauseButton,
        GenerateButton, DownloadButton, BackspaceButton } from './Buttons';
import { ButtonGroup, ButtonToolbar, Badge } from 'react-bootstrap'
export default class Toolbar extends Component {
    render() {
        const noteRange = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6']
        const divStyle = {
            margin: '0',
            // padding: '0',
            width: '20%',
            backgroundColor:'#999999',
            position: 'fixed',
            height: '100%',
            overflow: 'auto',
        };
        const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center' };
        return (
            <div style={divStyle}>
                <Badge variant="warning" style={centerStyle}><h2>HIT MAKER</h2></Badge>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <AddButton/>{' '}
                    <BackspaceButton/>
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <PlayButton/>{' '}
                    <PauseButton/>
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>                
                <ButtonGroup>
                    <GenerateButton/>{' '}
                    <DownloadButton/>
                </ButtonGroup>                    
                </ButtonToolbar>
                <hr></hr>
                <label htmlFor="mode">Choose mode input</label>
                <select name="mode" id="name">
                    <option selected>Note</option>
                    <option disabled>Chord</option>
                </select>
                <hr></hr>
                <label htmlFor="time">Choose time</label>
                <select name="time" id="time">
                    <option>2/4</option>
                    <option>3/4</option>
                    <option selected>4/4</option>
                </select>
                <hr></hr>
                <label htmlFor="note">Note</label>
                <select name="note" id="note">
                    { noteRange.map((v, idx) => {
                        return <option key={idx}>{v}</option>
                    })}
                </select>
            </div>
        )
    }
}
