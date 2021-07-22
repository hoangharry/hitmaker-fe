import React, { useContext } from 'react';
import Toolbar from '../Toolbar';
import {Score} from '../Score';
import { TopNavbar } from '../About';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [[], []],
            curNote: '',
            curClef: ['treble', 'alto'],
            firstClef: ['treble', 'alto'],
            stave: 0,
            keySignature: 'C'

        };
        this.onClickNote = this.onClickNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.onGenerate = this.onGenerate.bind(this);
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
            note.dur = 32; 
        } else if (noteType === 'minim') {
            note.dur = 16;
        } else if (noteType === 'quaver') {
            note.dur = 8;
        } else if (noteType === 'crotchet') {
            note.dur = 4;
        } else if (noteType === 'semiquaver') {
            note.dur = 2;
        } else if (noteType === 'demisemiquaver') {
            note.dur = 1;
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
        
    }

    onChangeKeySn(keysn) {
        this.setState({
            keySignature: keysn
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

    onDownload() {
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
                    onDownload={this.onDownload}  
                    onChangeClef={this.onChangeClef} 
                    onChangeStave={this.onChangeStave}                 
                />
                <Score notes={this.state.notes}
                    onDeleteNote={this.onDeleteNote}
                    firstClef={this.state.firstClef}
                    timeSignature={this.state.timeSignature}
                />
            </>
        )
    }
}