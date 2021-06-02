import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import crochetLogo from '../pictures/crotchet.png'
import demisemiquaverLogo from '../pictures/demisemiquaver.png'
import minimLogo from '../pictures/minim.png'
import quaverLogo from '../pictures/quaver.png'
import semibreveLogo from '../pictures/semibreve.png'
import semiquaverLogo from '../pictures/semiquaver.png'

const btnStyle = {
    display: 'flex', marginLeft: '5px', marginRight: '5px', justifyContent: 'center', width: '50px'
};

class AddButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
            <Icon.FileEarmarkPlus/>
            </Button>
        )
    }
}

class SemibreveBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('semibreve');
    }
    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={semibreveLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class MinimBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('minim');
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={minimLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class CrotchetBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('crotchet');
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={crochetLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class QuaverBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('quaver');
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={quaverLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class SemiQuaverBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('semiquaver');
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={semiquaverLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class DemisemiQuaverBtn extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onClickNote('demisemiquaver');
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg" onClick={() => this.handleOnCLick()}>
                <img src={demisemiquaverLogo} width="50px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class PlayButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
                <Icon.PlayBtn/>
            </Button>            
        )
    }
}

class PauseButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
                <Icon.PauseBtn/>
            </Button>  
        )
    }
}

class GenerateButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
                <Icon.ArrowClockwise/>
            </Button>  
        )
    }
}

class DownloadButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
                <Icon.BoxArrowDown/>
            </Button>  
        )
    }
}

class BackspaceButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
                <Icon.Backspace/>
            </Button>
        )
    }
}

export {
    AddButton,
    PlayButton,
    PauseButton,
    GenerateButton,
    DownloadButton,
    BackspaceButton,
    SemiQuaverBtn,
    MinimBtn,
    CrotchetBtn,
    QuaverBtn,
    SemibreveBtn,
    DemisemiQuaverBtn,
}