import Vex from 'vexflow';
import React, {Component} from 'react';

const VF = Vex.Flow;

export default class Score extends Component {
    constructor(props) {
        super(props);
        this.mapDuration = new Map();
        this.mapDuration.set("w", 32);
        this.mapDuration.set("h", 16);
        this.mapDuration.set("q", 8);
        this.mapDuration.set("8", 4);
        this.mapDuration.set("16", 2);
        this.mapDuration.set("32", 1);
    }
    
    checkNotes(notes) {
        let numNotesAdd = 0;
        let sumDuration = 0;
        notes.forEach((e) => {
            sumDuration += this.mapDuration.get(e.duration);
        });
        if (sumDuration % 32 === 0) {
        } else {
            let remainder = Math.ceil(sumDuration/32)*32 - sumDuration;
            for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
                const quotient = Math.floor(remainder/i);
                if (quotient === 0) {
                    continue;
                } else {
                    numNotesAdd += quotient;
                    let duration = [...this.mapDuration.entries()].find(([k, v]) => v === i)[0];
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
            let notes = notesProp;
            let tmpduration = 0;
            let prevStave;
            var tmpNotes = [];
            var isFisrt = true;
            notes.forEach((v, idx) => {
                console.log(v, idx);
                tmpduration += this.mapDuration.get(v.duration);
                tmpNotes.push(new VF.StaveNote({ keys: [v.note], duration: v.duration}));
                if (tmpduration === 32) {
                    if (isFisrt) {
                        VF.Formatter.FormatAndDraw(context, stave, tmpNotes);
                        prevStave = stave;
                        isFisrt = false;
                    } else {
                        var tmpStave = new VF.Stave(prevStave.width + prevStave.x, 0, tmpNotes.length*50);
                        tmpStave.setContext(context).draw();
                        VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes);
                        prevStave = tmpStave;
                    }
                    tmpNotes = [];
                    tmpduration = 0;
                } else {                 
                    if (idx === notes.length - 1) {
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