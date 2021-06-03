import Vex from 'vexflow';
import React, {Component} from 'react';

const VF = Vex.Flow;

export default class Score extends Component {
    constructor(props) {
        super(props);

    }
    
    checkNotes(notes) {
        let mapDuration = new Map();
        mapDuration.set("w", 32);
        mapDuration.set("h", 16);
        mapDuration.set("q", 8);
        mapDuration.set("8", 4);
        mapDuration.set("16", 2);
        mapDuration.set("32", 1);
        let numNotesAdd = 0;
        let sumDuration = 0;
        notes.forEach((e) => {
            sumDuration += mapDuration.get(e.duration);
        });
        if (sumDuration % 32 === 0) {
            console.log("notes enough");
        } else {
            let remainder = Math.ceil(sumDuration/32)*32 - sumDuration;
            for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
                const quotient = Math.floor(remainder/i);
                if (quotient === 0) {
                    continue;
                } else {
                    numNotesAdd += quotient;
                    let duration = [...mapDuration.entries()].find(([k, v]) => v === i)[0];
                    for (let j = 0; j < quotient; j++) {
                        notes.push(new VF.StaveNote({keys: ["D/4"], duration: duration}));
                    }
                    remainder %= i;
                    if (remainder === 0) {
                        break;
                    }
                }
            }
            console.log('notes added', notes);
        }
        return {notes, numNotesAdd};
    }


    componentDidUpdate(){
        document.getElementById('new-song').innerHTML = "";
        this.renderPage();
    }
    
    renderPage() {
        var notesProp = this.props.notes;
        const svgContainer = document.getElementById('new-song');
        
        var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        renderer.resize(1000, 1000);
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 0, 300);
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(context).draw();
        console.log('notesProp', notesProp);
        if (notesProp.length !== 0) {
            console.log('render here');
            let notes = notesProp;
            let mapDuration = new Map();
            mapDuration.set("w", 32);
            mapDuration.set("h", 16);
            mapDuration.set("q", 8);
            mapDuration.set("8", 4);
            mapDuration.set("16", 2);
            mapDuration.set("32", 1);
            let tmpduration = 0;
            let prevStave;
            var tmpNotes = [];
            var isFisrt = true;
            notes.forEach((v, idx) => {
                console.log(v, idx);
                tmpduration += mapDuration.get(v.duration);
                tmpNotes.push(new VF.StaveNote({ keys: [v.note], duration: v.duration}));
                console.log('ua towi day chuwa mas');
                console.log('tmpduration', tmpduration);
                if (tmpduration === 32) {
                    console.log('tmpduration is 32');
                    if (isFisrt) {
                        VF.Formatter.FormatAndDraw(context, stave, tmpNotes);
                        prevStave = stave;
                        isFisrt = false;
                    } else {
                        console.log('tmpNotes', tmpNotes);
                        var tmpStave = new VF.Stave(prevStave.width + prevStave.x, 0, tmpNotes.length*50);
                        tmpStave.setContext(context).draw();
                        VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes);
                        prevStave = tmpStave;
                    }
                    tmpNotes = [];
                    tmpduration = 0;
                } else {                 
                    if (idx === notes.length - 1) {
                        console.log('last note is not enough 32');
                        var lastStave = this.checkNotes(tmpNotes);
                        console.log('laststave', lastStave);
                        if (isFisrt) {
                            VF.Formatter.FormatAndDraw(context, stave, lastStave.notes);
                        } else {
                            var tmpStave = new VF.Stave(prevStave.width + prevStave.x, 0, lastStave.notes.length*50);
                            tmpStave.setContext(context).draw();
                            VF.Formatter.FormatAndDraw(context, tmpStave, lastStave.notes);
                        }
                        const vfNotes = document.getElementsByClassName("vf-stavenote");
                        for (let i = 1; i <= lastStave.numNotesAdd; i++) {
                            vfNotes[vfNotes.length - i].setAttribute("hidden", true);
                        }
                    }                
                }
            });
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