import React, { Component } from 'react';
import { PlayButton, AddButton, PauseButton,
        GenerateButton, DownloadButton, BackspaceButton, SemibreveBtn, MinimBtn, CrotchetBtn, QuaverBtn, SemiQuaverBtn, DemisemiQuaverBtn } from './Buttons';
import { ButtonGroup, ButtonToolbar, Badge } from 'react-bootstrap'

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: 'C4'
        };
        this.handleOnChangeNote = this.handleOnChangeNote.bind(this);
    }

    componentDidMount() {
        this.props.onChangeNote(this.state.note);
    }

    handleOnChangeNote(e) {
        this.props.onChangeNote(e);
    }

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
                <label htmlFor="note">Note</label>
                <select name="note" id="note" onChange={(e) => this.handleOnChangeNote(e.target.value)}>
                    { noteRange.map((v, idx) => {
                        return <option key={idx}>{v}</option>
                    })}
                </select>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    {/* <SemibreveBtn onClickSemibreve={() => this.handleNoteSemibreve()}/>{' '} */}
                    <SemibreveBtn onClickNote={this.props.onClickNote}/>{' '}
                    <MinimBtn onClickNote={this.props.onClickNote}/>
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <CrotchetBtn onClickNote={this.props.onClickNote}/>{' '}
                    <QuaverBtn onClickNote={this.props.onClickNote}/>
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>                
                <ButtonGroup>
                    <SemiQuaverBtn onClickNote={this.props.onClickNote}/>{' '}
                    <DemisemiQuaverBtn onClickNote={this.props.onClickNote}/>
                </ButtonGroup>                    
                </ButtonToolbar>
            </div>
        )
    }
}
