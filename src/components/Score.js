import Vex from 'vexflow';
import React, {Component} from 'react';

const VF = Vex.Flow;

export default class Score extends Component {
    constructor(props) {
        super(props);

    }
    
    checkNotes() {
        let mapDuration = new Map();
        mapDuration.set("w", 32);
        mapDuration.set("h", 16);
        mapDuration.set("q", 8);
        mapDuration.set("8", 4);
        mapDuration.set("16", 2);
        mapDuration.set("32", 1);

        let sumDuration = 0;
        notes.forEach((e) => {
            sumDuration += mapDuration.get(e.duration);
        });
        if (sumDuration % 32 === 0) {
            console.log("notes enough")
        } else {
            let numNotesAdd = 0;
            let remainder = Math.ceil(sumDuration/32)*32 - sumDuration;
            for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
                const quotient = Math.floor(remainder/i);
                if (quotient === 0) {
                    continue;
                } else {
                    numNotesAdd += quotient;
                    let duration = [...mapDuration.entries()].find(([k, v]) => v === i)[0];
                    for (let j = 0; j < quotient; j++) {
                        notes.push({ note: "C4", duration: duration});
                    }
                    remainder %= i;
                    if (remainder === 0) {
                        break;
                    }
                }
            }
            console.log('notes added', notes);
        }
    }


    componentDidUpdate(){
        document.getElementById('new-song').innerHTML = "";
        this.renderPage();
    }
    
    renderPage() {
        console.log('render');
        var notesProp = this.props.notes;
        notesProp = [
            { note: "C/4", duration: "q"},
            { note: "D/4", duration: "q"},
            { note: "B/4", duration: "q"},
            // { note: "C/4", duration: "q"}
        ]
        const svgContainer = document.getElementById('new-song');
        
        var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        renderer.resize(500, 500);
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 40, 400);
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(context).draw();
        console.log('notesProp', notesProp);
        if (notesProp.length !== 0) {
            var notes = [];
            notesProp.forEach((element) => {
                notes.push(new VF.StaveNote({ clef: "treble", keys: [element.note], duration: element.duration}));
            });
            // var notes = [
            //     new VF.StaveNote({clef:"treble", keys: ["c/4"], duration: "q"}),
            //     new VF.StaveNote({clef:"treble", keys: ["d/4"], duration: "q"}),
            //     new VF.StaveNote({clef:"treble", keys: ["b/4"], duration: "q"}),
            //     new VF.StaveNote({clef:"treble", keys: ["c/4"], duration: "q"})
            // ];
            var voice = new VF.Voice({num_beats: 4, beat_value: 4});
            voice.addTickables(notes);
            var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
            voice.draw(context, stave);
        }

        // var vf = new VF.Factory({
        //     renderer: {elementId: svgContainer, width: 500, height: 200}
        // });
        // var score = vf.EasyScore();
        // var system = vf.System();
        // system.addStave({
        //     voices: [score.voice(score.notes('C5/q, B4').concat(score.notes('A4/8, G4, C5, B4')))]
        // }).addClef('treble').addTimeSignature('4/4');
        // vf.draw();


    
        // var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        // // Size our SVG:
        // renderer.resize(500, 500);

        // // And get a drawing context:
        // var context = renderer.getContext();
        // var stave = new VF.Stave(10, 40, 400);
        // stave.addClef('treble').addTimeSignature('4/4');
        // stave.setContext(context).draw();
        // var notes = [
        //     // A quarter-note C.
        //     new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
          
        //     // A quarter-note D.
        //     new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
          
        //     // A quarter-note rest. Note that the key (b/4) specifies the vertical
        //     // position of the rest.
        //     new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
          
        //     // A C-Major chord.
        //     new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
        // ];
        // console.log('notes', notes);
        // var voice = new VF.Voice({num_beats: 4, beat_value: 4});
        // voice.addTickable(notes);
        // var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
        // voice.draw(context, stave);
        // if (notesProp.length === 0) {
        //     console.log('notes = 0');
        //     stave.setContext(context).draw();
        // } else {
        //     console.log('notes > 0');
        //     var notes = [
        //         // A quarter-note C.
        //         new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
              
        //         // A quarter-note D.
        //         new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
              
        //         // A quarter-note rest. Note that the key (b/4) specifies the vertical
        //         // position of the rest.
        //         new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
              
        //         // A C-Major chord.
        //         new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
        //     ];
        //     console.log('notes', notes);
        //     var voice = new VF.Voice({num_beats: 4, beat_value: 4});
        //     voice.addTickable(notes);
        //     var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
        //     voice.draw(context, stave);
        // }
    }

    render() {
        const divStyle = {
            marginLeft:'25%',
            // marginTop: '20px',
            padding:'1px 16px',
            // height:'1000px',
        };
        const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '20px' };
        const rightStyle = { display: 'flex',  justifyContent:'right' };
        // return <div ref="outer" style={{
        //     border: "2px blue solid",
        //     padding: 10,
        //     borderRadius: 10,
        //     display: "inline-block",
        // }}>
        // </div>;
        return (
            <div style={divStyle}>
                <h5 style={centerStyle}>Title</h5>
                <h6 style={rightStyle}>Author</h6>
                <div id="new-song"></div>
            </div>
         
        )
    }
}