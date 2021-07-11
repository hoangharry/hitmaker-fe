import React, { Component } from 'react';
import { PlayButton, AddButton, PauseButton,
        GenerateButton, DownloadButton, BackspaceButton, SemibreveBtn, MinimBtn, CrotchetBtn, QuaverBtn, SemiQuaverBtn, DemisemiQuaverBtn } from './Buttons';
import { ButtonGroup, ButtonToolbar, Form } from 'react-bootstrap'

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: 'C/2'
        };
        this.handleOnChangeNote = this.handleOnChangeNote.bind(this);
        this.handleOnChangeClef = this.handleOnChangeClef.bind(this);
        this.handleOnChangeStave = this.handleOnChangeStave.bind(this);
    }

    componentDidMount() {
        this.props.onChangeNote(this.state.note);
    }

    handleOnChangeNote(e) {
        this.props.onChangeNote(e);
    }

    handleOnChangeClef(e) {
        this.props.onChangeClef(e);
    }

    handleOnChangeStave(e) {
        this.props.onChangeStave(Number(e));
    }

    render() {
        const noteRange = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3',
            'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6'];
        const divStyle = {
            margin: '0',
            // padding: '0',
            width: '20%',
            backgroundColor:'#adac9c',
            position: 'fixed',
            height: '100%',
            overflow: 'auto',
        };
        const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '5px' };
        return (
            <div style={divStyle}>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <AddButton onAddNew={this.props.onAddNew}/>{' '}
                    <DownloadButton onDownload={this.props.onDownload}/>
                    <GenerateButton onGenerate={this.props.onGenerate}/>{' '}
                    
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <PlayButton onPlay={this.props.onPlay}/>{' '}
                    <PauseButton onPause={this.props.onPause}/>
                    <BackspaceButton onDeleteNote={this.props.onDeleteNote}/>
                </ButtonGroup>
                </ButtonToolbar>
                <hr></hr>
                <Form style={{margin: '15px'}}>
                    <Form.Group controlId="selectMode">
                        <Form.Label>Mode input</Form.Label>
                        <Form.Control as="select" custom>
                        <option>Note</option>
                        <option disabled>Chord</option>
                        </Form.Control>

                        <Form.Label>Stave</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => this.handleOnChangeStave(e.target.value)}>
                            <option value='0'>1</option>
                            <option value='1'>2</option>
                        </Form.Control>

                        <Form.Label>Key Clef</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => this.handleOnChangeClef(e.target.value)}>
                            <option value='treble'>Treble</option>
                            <option value='alto'>Alto</option>
                            <option value='bass'>Bass</option>
                        </Form.Control>
                        
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => this.handleOnChangeNote(e.target.value)}>
                        { noteRange.map((v, idx) => {
                        return <option key={idx}>{v}</option>
                        })}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <hr></hr>
                <ButtonToolbar style={centerStyle}>
                <ButtonGroup>
                    <SemibreveBtn onClickNote={this.props.onClickNote}/>{' '}
                    <MinimBtn onClickNote={this.props.onClickNote}/>{' '}
                    <QuaverBtn onClickNote={this.props.onClickNote}/>
                </ButtonGroup>
                </ButtonToolbar>
                
                <hr></hr>
                <ButtonToolbar style={centerStyle}>                
                <ButtonGroup>
                    <CrotchetBtn onClickNote={this.props.onClickNote}/>{' '}
                    <SemiQuaverBtn onClickNote={this.props.onClickNote}/>{' '}
                    <DemisemiQuaverBtn onClickNote={this.props.onClickNote}/>
                </ButtonGroup>                    
                </ButtonToolbar>
            </div>
        )
    }
}
