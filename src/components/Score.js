import Vex from 'vexflow';
import React, {Component} from 'react';

const VF = Vex.Flow;

export default class Score extends Component {
    componentDidMount() {
        const svgContainer = document.createElement('div');
        const {notesProp} = this.props;
        var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG);
        // Size our SVG:
        renderer.resize(500, 500);

        // And get a drawing context:
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 40, 400);
        stave.addClef('treble').addTimeSignature('4/4');
        stave.setContext(context).draw();
        if (notesProp) {
            var notes = []
            notesProp.forEach((element) => {
                notes.push(new VF.StaveNote({clef: "treble", keys: [element.note], duration: element.duration}));             
            });              
            // Create a voice in 4/4 and add the notes from above
            var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
            voice.addTickables(notes);
            
            // Format and justify the notes to 400 pixels.
            var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
            
            // Render voice
            voice.draw(context, stave);
        }
        this.refs.outer.appendChild(svgContainer);
    }
    

    render() {
        const divStyle = {
            marginLeft:'25%',
            // marginTop: '20px',
            padding:'1px 16px',
            // height:'1000px',
        };
        const centerStyle = { display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '20px' };
        const leftStyle = { display: 'flex',  justifyContent:'left', alignItems:'center' };
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
                <h6 style={leftStyle}>Author</h6>
                <div ref="outer"></div>

            </div>
         
        )
    }
}