import React from 'react';
import Toolbar from './Toolbar';
import {Score} from './Score';
import { TopNavbar } from './About';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [[], []],
            curNote: '',
            timeSignature: '4/4',
            curClef: ['treble', 'treble'],
            firstClef: ['treble', 'treble'],
            stave: 0,

        };
        this.onClickNote = this.onClickNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onGenerate = this.onGenerate.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onAddNew = this.onAddNew.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onChangeClef = this.onChangeClef.bind(this);
        this.onChangeStave = this.onChangeStave.bind(this);
    }

    onClickNote(noteType) {
        let notes = this.state.notes[this.state.stave].slice();
        var note = {
            note: this.state.curNote,
            clef: this.state.curClef[this.state.stave],
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
        notes = notes.concat(note);
        if (this.state.stave === 0) {
            const notesOther = this.state.notes[1].slice();
            this.setState({
                notes: [notes, notesOther]
            })
        } else {
            const notesOther = this.state.notes[0].slice();
            this.setState({
                notes: [notesOther, notes]
            });
        }
    }

    onDeleteNote() {
        const notes = this.state.notes[this.state.stave].slice(0, this.state.notes[this.state.stave].length - 1);
        if (this.state.stave === 0) {
            const notesOther = this.state.notes[1].slice();
            this.setState({
                notes: [notes, notesOther]
            });
        } else {
            const notesOther = this.state.notes[0].slice();
            this.setState({
                notes: [notesOther, notes]
            });
        }
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

    onChangeStave(stave) {
        this.setState({
            stave: stave
        });
    }

    onChangeNote(note) {
        this.setState({
            curNote: note
        })
    }

    onChangeClef(clef) {
        if (this.state.notes[this.state.stave].length === 0) {
            if (this.state.stave === 0) {
                const otherClef = this.state.firstClef[1];
                this.setState({
                    firstClef: [clef, otherClef]
                });
            } else {
                const otherClef = this.state.firstClef[0];
                this.setState({
                    firstClef: [otherClef, clef]
                });
            }
        } else {
            if (this.state.stave === 0) {
                const otherClef = this.state.curClef[1];
                this.setState({
                    curClef: [clef, otherClef]
                });
            } else {
                const otherClef = this.state.curClef[0];
                this.setState({
                    curClef: [otherClef, clef]
                });
            }
        }
    }


    onAddNew() {
        window.open();
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
                <TopNavbar/>
                <Toolbar
                    onClickNote={this.onClickNote}
                    onChangeNote={this.onChangeNote}
                    onDeleteNote={this.onDeleteNote}
                    onGenerate={this.onGenerate}
                    onAddNew={this.onAddNew}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onDownload={this.onDownload}  
                    onChangeClef={this.onChangeClef} 
                    onChangeStave={this.onChangeStave}                 
                />
                <Score notes={this.state.notes}
                    onDeleteNote={this.onDeleteNote}
                    firstClef={this.state.firstClef}
                />
            </>
        )
    }
}