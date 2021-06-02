import React from 'react';
import Toolbar from './Toolbar';
import Score from './Score';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            curNote: '',

        };
        this.onClickNote = this.onClickNote.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
    }
    onClickNote(noteType) {
        const notes = this.state.notes.slice();
        console.log('notes', notes);
        var note = {
            note: this.state.curNote,
        };
        if (noteType === 'semibreve') {
            note.duration = 'w'; 
        } else if (noteType === 'minim') {
            note.duration = 'h';
        } else if (noteType === 'crotchet') {
            note.duration = 'q';
        } else if (noteType === 'quaver') {
            note.duration = '8';
        } else if (noteType === 'semiquaver') {
            note.duration = '16';
        } else if (noteType === 'demisemiquaver') {
            note.duration = '32';
        }
        this.setState({
            notes: notes.concat(note)
        });
        console.log('note', note.note, note.duration);
    }

    onDeleteNote() {
        const notes = this.state.notes.slice(0, this.state.notes.length - 2);
        this.setState({
            notes: notes
        });
    }

    onGenerate() {
        fetch('', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue'
            })
        })
            .then((response) => response.json())
            .then((json) => {
                // return json;
                this.setState({
                    notes: json
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeNote(note) {
        console.log('onChangeNote', note);
        this.setState({
            curNote: note
        })
    }    

    render() {
        return (
            <>
                <Toolbar
                    onClickNote={this.onClickNote}
                    onChangeNote={this.onChangeNote}
                />
                <Score notes={this.state.notes}/>
            </>
        )
    }
}