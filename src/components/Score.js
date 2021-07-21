import Vex from 'vexflow';
import React, { useContext, useEffect, useState} from 'react';
import {ExceedNotesDialog} from './Dialog';
import { SongInfoContext } from '../context/SongInfoContext';
import { useHistory } from 'react-router-dom';

export function Score(props) {
    const VF = Vex.Flow;
    const [showModal, setShowModal] = useState(false);
    let mapDuration = new Map();
    mapDuration.set(32, "w");
    mapDuration.set(16, "h");
    mapDuration.set(8, "q");
    mapDuration.set(4, "8");
    mapDuration.set(2, "16");
    mapDuration.set(1, "32");
    mapDuration.set(24, "2d");
    mapDuration.set(12, "4d");
    mapDuration.set(3, "16d");
    mapDuration.set(6, "8d")
    const { song } = useContext(SongInfoContext)

    let beatsPerBar = 0;
    if (song[0].timeSignature === '4/4') {
        beatsPerBar = 32;
    }
    if (song[0].timeSignature === '3/4') {
        beatsPerBar = 24;
    }
    if (song[0].timeSignature === '2/4') {
        beatsPerBar = 16;
    }

    const checkNotes = (notes) => {
        let numNotesAdd = 0;
        let sumDuration = 0;
        notes.forEach((e) => {
            sumDuration += e.dur;
        });
        if (sumDuration % beatsPerBar === 0) {
        } else {
            let remainder = Math.ceil(sumDuration/beatsPerBar)*beatsPerBar - sumDuration;
            for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
                const quotient = Math.floor(remainder/i);
                if (quotient === 0) {
                    continue;
                } else {
                    numNotesAdd += quotient;
                    let duration = [...mapDuration.entries()].find(([k, v]) => k === i)[1];
                    for (let j = 0; j < quotient; j++) {
                        notes.push(new VF.StaveNote({keys: ["D/4"], duration: duration}));
                    }
                    remainder %= i;
                    if (remainder === 0) {
                        break;
                    }
                }
            }
        }
        return {notes, numNotesAdd};
    }

    const addKeySn = (keySn) => {
        const mapKey = new Map();
        mapKey.set('C', '');
        mapKey.set('G', '#');
        mapKey.set('D', '##');
        mapKey.set('A', '###');
        mapKey.set('E', '####');
        mapKey.set('B', '#####');
        mapKey.set('F#', '######');
        mapKey.set('C#', '#######');
        mapKey.set('F', 'b');
        mapKey.set('B-', 'bb');
        mapKey.set('E-', 'bbb');
        mapKey.set('A-', 'bbbb');
        mapKey.set('D-', 'bbbbb');
        mapKey.set('G-', 'bbbbbb');
        mapKey.set('C-', 'bbbbbbb');


    }
    const notesTreble = ['C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6'];
    const notesAlto = ['C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5'];
    const notesBass = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4'];

    const drawNotes = (staveN, context, svgContainer, props) => {
        const width = svgContainer.getBoundingClientRect().width;
        const notes = props.notes[staveN];
        console.log('notes', notes);
        if (notes.length === 0) {
            var stave;
            if (staveN === 1) {
                stave = new VF.Stave(10, 100, width);
            } else {
                stave = new VF.Stave(10, 0, width);
            }
            stave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature);
            stave.setContext(context).draw();
        } else {
            console.log('notes', notes);
            let curClef = props.firstClef[staveN];
            let tmpduration = 0, staveX = 10, staveY = 0;
            if (staveN === 1) {
                staveY = 100;
            }
            let prevStave;
            var tmpNotes = [];
            var isFisrt = true;
            notes.forEach((v, idx) => {
                if (v.note) {
                    tmpduration += v.dur;
                    let tmpClefNotes;
                    if (curClef === 'treble') {
                        tmpClefNotes = notesTreble;
                    } else if (curClef === 'alto') {
                        tmpClefNotes = notesAlto;
                    } else {
                        tmpClefNotes = notesBass
                    }
                    if (!tmpClefNotes.includes(v.note)) {
                        if (notesTreble.includes(v.note)) {
                            tmpNotes.push(new VF.ClefNote('treble'));
                            curClef = 'treble';
                        } else if (notesAlto.includes(v.note)) {
                            tmpNotes.push(new VF.ClefNote('alto'));
                            curClef = 'alto';
                        } else {
                            tmpNotes.push(new VF.ClefNote('bass'));
                            curClef = 'bass';
                        }
                    }
                    if (mapDuration.get(v.dur).includes('d')) {
                        tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [v.note], duration: mapDuration.get(v.dur), auto_stem: true}).addDotToAll());
                    } else {
                        tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [v.note], duration: mapDuration.get(v.dur), auto_stem: true}));
                    }
                } else {
                    tmpduration += v.dur;
                    let tmpClefNotes;
                    if (curClef === 'treble') {
                        tmpClefNotes = notesTreble;
                    } else if (curClef === 'alto') {
                        tmpClefNotes = notesAlto;
                    } else {
                        tmpClefNotes = notesBass
                    }
                    if (!tmpClefNotes.includes(v.chord[0])) {
                        if (notesTreble.includes(v.chord[0])) {
                            tmpNotes.push(new VF.ClefNote('treble'));
                            curClef = 'treble';
                        } else if (notesAlto.includes(v.chord[0])) {
                            tmpNotes.push(new VF.ClefNote('alto'));
                            curClef = 'alto';
                        } else {
                            tmpNotes.push(new VF.ClefNote('bass'));
                            curClef = 'bass';
                        }
                    }
                    if (mapDuration.get(v.dur).includes('d')) {
                        tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: v.chord, duration: mapDuration.get(v.dur), auto_stem: true}).addDotToAll());
                    } else {
                        tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: v.chord, duration: mapDuration.get(v.dur), auto_stem: true}));
                    }
                }
                
                var tmpStave;
                if (tmpduration > beatsPerBar) {
                    setShowModal(true);
                    props.onDeleteNote();
                }
                if (tmpduration === beatsPerBar) {
                    if (isFisrt) {
                        tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50);
                        tmpStave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature);
                        tmpStave.setContext(context).draw();
                        VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes);
                        prevStave = tmpStave;
                        isFisrt = false;
                    } else {
                        const noteWidth = Math.trunc((width - (prevStave.x + prevStave.width) - 10)/tmpNotes.length);
                        if (noteWidth < 20) {
                            staveX = 10;
                            staveY += 200;
                            tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50).addClef(curClef).addTimeSignature(song[0].timeSignature);
                        } else if (noteWidth < 50) {
                            tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*noteWidth);
                        } else {
                            tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*50);
                        }
                        tmpStave.setContext(context).draw();
                        VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes);
                        prevStave = tmpStave;
                    }
                    tmpNotes = [];
                    tmpduration = 0;
                } else {   
                    console.log('1');              
                    if (idx === notes.length - 1) {
                        console.log('come here');
                        var lastStave = checkNotes(tmpNotes);
                        if (isFisrt) {
                            tmpStave = new VF.Stave(staveX, staveY, lastStave.notes.length*50);
                            tmpStave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature);
                            tmpStave.setContext(context).draw();
                            VF.Formatter.FormatAndDraw(context, tmpStave, lastStave.notes);
                        } else {
                            if (prevStave.x + prevStave.width + lastStave.notes.length*50 > 0.9*svgContainer.getBoundingClientRect().width) {
                                console.log('come here');
                                staveX = 10;
                                staveY += 200;
                                tmpStave = new VF.Stave(staveX, staveY, lastStave.notes.length*50).addClef(curClef).addTimeSignature(song[0].timeSignature);
                            } else {
                                console.log('4');
                                tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, lastStave.notes.length*50);
                                console.log(prevStave.x + prevStave.width + lastStave.notes.length*50);
                            }
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
    }

    

    useEffect(() => {
        document.getElementById('new-song').innerHTML = "";
        var notesProp = props.notes;
        const svgContainer = document.getElementById('new-song');
        
        var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        const width = svgContainer.getBoundingClientRect().width;
        renderer.resize(width, 1000);
        var context = renderer.getContext();

        // Create and draw the tablature stave
// var stave = new Vex.Flow.Stave(10, 0, 500).addClef('treble').addTimeSignature('4/4');
// var stave2 = new Vex.Flow.Stave(10, 100, 500).addClef('treble').addTimeSignature('4/4');

// // Create some notes
// var notes1 = [
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4"}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4"}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4"}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4"}),
// ];
// notes1[0].addArticulation(0, new VF.Articulation('a.'));
// const tie = [
//     new VF.StaveTie({
//         first_note: null,
//         last_note: notes1[0]
//         // first_indices: [0, 1],
//         // last_indices: [0, 1]
//     })
// ]
// var notes1 = [
//     new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: 'wr' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: 'hr' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: '4r' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: '8r' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: '16r' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: '32r' }).addDotToAll(),
        // new VF.StaveNote({ keys: ['b/4'], stem_direction: 1, duration: '64r' }).addDotToAll(),
// ]
// var notes2 = [
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "8"}).addAccidental(0, new VF.Accidental('n')),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "8"}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "8"}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4", stem_direction: -1}),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4d"}).addDotToAll(),
//   new Vex.Flow.StaveNote({keys: ["c/4"],duration: "4"}),
// ];
// console.log('note1', notes1[0].intrinsicTicks);
// const a = notes1.filter((note) => note.intrinsicTicks < 4096);
// console.log('a',a)
// const b = notes2.filter((note) => note.intrinsicTicks < 4096);
// // var beams = [
//     // new VF.Beam(a),
//     // new VF.Beam(b)];
// var voice1 = new Vex.Flow.Voice({
//    num_beats: 4,
//    beat_value: 4,
//    resolution: Vex.Flow.RESOLUTION
// });

//  var voice2 = new Vex.Flow.Voice({
//    num_beats: 4,
//    beat_value: 4,
//    resolution: Vex.Flow.RESOLUTION
// });


// voice1.addTickables(notes1);
// voice2.addTickables(notes2);


// var formatter = new Vex.Flow.Formatter().format([voice2,voice1], 500);

// stave.setContext(context).draw({auto_beam: true});
// stave2.setContext(context).draw({auto_beam: true});
// voice1.draw(context, stave)
// voice2.draw(context, stave2)
// tie.forEach(function(b) {b.setContext(context).draw()})
// beams.forEach(function(b) {b.setContext(context).draw()});
        console.log('notesProp', notesProp);
        drawNotes(0, context, svgContainer, props);
        drawNotes(1, context, svgContainer, props);
    })

    const divStyle = {
        marginLeft:'25%',
        // marginTop: '20px',
        padding:'1px 16px',
        // height:'1000px',
    };
    const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '20px' };
    return (
        <>
        <ExceedNotesDialog
            show={showModal}
            onHide={() => setShowModal(false)}
        />
        <div style={divStyle}>
            <h5 style={centerStyle}>{song[0].saveName}</h5>
            <div style={{width: 'auto'}} id="new-song"></div>
        </div>
        </>
    )
}
