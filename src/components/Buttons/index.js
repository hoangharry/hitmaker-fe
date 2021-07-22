import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import Button from '../common/Button'
import crochetLogo from '../../pictures/crotchet.png'
import demisemiquaverLogo from '../../pictures/demisemiquaver.png'
import minimLogo from '../../pictures/minim.png'
import quaverLogo from '../../pictures/quaver.png'
import semibreveLogo from '../../pictures/semibreve.png'
import semiquaverLogo from '../../pictures/semiquaver.png'

class AddButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onAddNew();
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.FileEarmarkPlus style={{fontSize: '2em'}}/>
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
            <Button onClick={() => this.handleOnCLick()}>
                <img style={{marginTop: '5px'}} src={semibreveLogo} width="30px" height="30px" alt="img"></img>
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
            <Button onClick={() => this.handleOnCLick()}>
                <img src={minimLogo} width="50px" height="45px" alt="img"></img>
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
            <Button onClick={() => this.handleOnCLick()}>
                <img src={crochetLogo} width="40px" height="50px" alt="img"></img>
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
            <Button onClick={() => this.handleOnCLick()}>
                <img src={quaverLogo} width="30px" height="50px" alt="img"></img>
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
            <Button onClick={() => this.handleOnCLick()}>
                <img src={semiquaverLogo} width="40px" height="45px" alt="img"></img>
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
            <Button  onClick={() => this.handleOnCLick()}>
                <img src={demisemiquaverLogo} width="40px" height="50px" alt="img"></img>
            </Button>            
        )
    }
}

class PlayButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onPlay();
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.PlayBtn style={{fontSize: '2em'}}/>
            </Button>            
        )
    }
}

class PauseButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onPause()
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.PauseBtn style={{fontSize: '2em'}}/>
            </Button>  
        )
    }
}

class GenerateButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onGenerate();
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.ArrowClockwise style={{fontSize: '2em'}}/>
            </Button>  
        )
    }
}

class DownloadButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onDownload()
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.BoxArrowDown style={{fontSize: '2em'}}/>
            </Button>  
        )
    }
}

class BackspaceButton extends Component {
    constructor(props) {
        super(props);
        this.handleOnCLick = this.handleOnCLick.bind(this);
    }

    handleOnCLick() {
        this.props.onDeleteNote();
    }

    render() {
        return (
            <Button onClick={() => this.handleOnCLick()}>
                <Icon.Backspace style={{ fontSize: '2em' }}/>
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