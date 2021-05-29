import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

const btnStyle = {
    display: 'flex', marginLeft: '5px', marginRight: '5px', justifyContent: 'center', width: '50px'
};

class AddButton extends Component {
    // constructor() {
    //     super(this.props);
    // }

    onClick() {

    }
    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg">
            <Icon.FileEarmarkPlus/>
            </Button>
        )
    }
}

class PlayButton extends Component {
    // constructor() {
    //     super(this.props);
    // }

    onClick() {

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
    // constructor() {
    //     super(this.props);
    // }

    onClick() {

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
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        return fetch('', {
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
                return json;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Button style={btnStyle} variant="warning" size="lg"
                onClick={this.onClick()}>
                <Icon.ArrowClockwise/>
            </Button>  
        )
    }
}

class DownloadButton extends Component {
    // constructor() {
    //     super(this.props);
    // }

    onClick() {

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
    // constructor() {
    //     super(this.props);
    // }

    onClick() {

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
}