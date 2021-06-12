import Vex from 'vexflow';
import React, {Component} from 'react';
import context from 'react-bootstrap/esm/AccordionContext';

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
    
    componentDidMount() {
        this.renderPage();
    }


    componentDidUpdate(prevProps, prevState){
        document.getElementById('new-song').innerHTML = "";
        this.renderPage();
    }
    
    renderPage() {
        var notesProp = this.props.notes;
        const svgContainer = document.getElementById('new-song');
        
        var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        const width = svgContainer.getBoundingClientRect().width;
        renderer.resize(width, 1000);
        var context = renderer.getContext();

        if (notesProp.length === 0) {
            var stave = new VF.Stave(10, 0, 300);
            stave.addClef('treble').addTimeSignature('4/4');
            stave.setContext(context).draw();
        } else {
            let notes = notesProp;
            let tmpduration = 0, staveX = 10, staveY = 0;
            let prevStave;
            var tmpNotes = [];
            var isFisrt = true;
            notes.forEach((v, idx) => {
                tmpduration += this.mapDuration.get(v.duration);
                tmpNotes.push(new VF.StaveNote({ keys: [v.note], duration: v.duration}));
                var tmpStave;
                if (tmpduration === 32) {
                    if (isFisrt) {
                        console.log('1')
                        tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50);
                        tmpStave.addClef('treble').addTimeSignature('4/4');
                        tmpStave.setContext(context).draw();
                        VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes);
                        prevStave = tmpStave;
                        isFisrt = false;
                    } else {
                        console.log("prevStave x", prevStave.x);
                        console.log("x", 0.9*width);
                        const noteWidth = Math.trunc((width - (prevStave.x + prevStave.width) - 10)/tmpNotes.length);
                        console.log('params', width, prevStave.x + prevStave.width)
                        console.log('witdh left', width - (prevStave.x + prevStave.width));
                        console.log('widthnote', noteWidth);
                        if (noteWidth < 20) {
                            console.log('2');
                            staveX = 10;
                            staveY += 100;
                            tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50).addClef('treble').addTimeSignature('4/4');
                        } else if (noteWidth < 50) {
                            console.log('3');
                            // if (prevStave.width + prevStave.x + tmpNotes.length*50 > width) {
                            //     tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, width - (prevStave.width + prevStave.x) - 5);
                            // } else {
                                tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*noteWidth);
                            // }
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
                    if (idx === notes.length - 1) {
                        var lastStave = this.checkNotes(tmpNotes);
                        if (isFisrt) {
                            tmpStave = new VF.Stave(staveX, staveY, lastStave.notes.length*50);
                            tmpStave.addClef('treble').addTimeSignature('4/4');
                            tmpStave.setContext(context).draw();
                            VF.Formatter.FormatAndDraw(context, tmpStave, lastStave.notes);
                        } else {
                            if (prevStave.x + prevStave.width + lastStave.notes.length*50 > 0.9*svgContainer.getBoundingClientRect().width) {
                                console.log('come here');
                                staveX = 10;
                                staveY += 100;
                                tmpStave = new VF.Stave(staveX, staveY, lastStave.notes.length*50).addClef('treble').addTimeSignature('4/4');
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

    render() {
        const divStyle = {
            marginLeft:'25%',
            // marginTop: '20px',
            padding:'1px 16px',
            // height:'1000px',
        };
        const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '20px' };
        const rightStyle = { display: 'flex',  marginLeft:'1000px' };
        return (
            <div style={divStyle}>
                <h5 style={centerStyle}>Title</h5>
                <h6 style={rightStyle}>Author</h6>
                <div id="new-song"></div>
            </div>
         
        )
    }
}