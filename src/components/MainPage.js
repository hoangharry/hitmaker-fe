import React from 'react';
import Toolbar from './Toolbar';
import Score from './Score';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            curNote: '',
            timeSignature: '4/4'

        };
        this.onClickNote = this.onClickNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onGenerate = this.onGenerate.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onAddNew = this.onAddNew.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }
    onClickNote(noteType) {
        const notes = this.state.notes.slice();
        var note = {
            note: this.state.curNote,
        };
        if (noteType === 'semibreve') {
            note.duration = 'w'; 
        } else if (noteType === 'minim') {
            note.duration = 'h';
        } else if (noteType === 'quaver') {
            note.duration = 'q';
        } else if (noteType === 'crotchet') {
            note.duration = '8';
        } else if (noteType === 'semiquaver') {
            note.duration = '16';
        } else if (noteType === 'demisemiquaver') {
            note.duration = '32';
        }
        this.setState({
            notes: notes.concat(note)
        });
    }

    onDeleteNote() {
        const notes = this.state.notes.slice(0, this.state.notes.length - 1);
        this.setState({
            notes: notes
        });
    }

    onGenerate() {
        const reqOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeSignature: this.state.timeSignature,
                secondParam: this.state.notes
            })
        };
        fetch('https://ahihi/generate', reqOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    notes: data.streamParts
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeNote(note) {
        this.setState({
            curNote: note
        })
    }    

    onAddNew() {

    }

    onDownload() {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename="picture.png'
            },
            body: JSON.stringify({
                saveName: 'abc',
                timeSignature: this.state.timeSignature,
                secondParam: this.state.notes
            })
        };
        fetch('https://ahihi/generate', reqOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    notes: data.streamParts
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onPlay() {

    }
    
    onPause() {

    }

    render() {
        return (
            <>
                <Toolbar
                    onClickNote={this.onClickNote}
                    onChangeNote={this.onChangeNote}
                    onDeleteNote={this.onDeleteNote}
                    onGenerate={this.onGenerate}
                    onAddNew={this.onAddNew}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onDownload={this.onDownload}                    
                />
                <Score notes={this.state.notes}/>
            </>
        )
    }
}