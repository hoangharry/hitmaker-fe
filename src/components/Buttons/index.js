import React from 'react'
import Button from 'src/components/common/Button'
import addIcon from 'src/pictures/add-icon.png'
import saveIcon from 'src/pictures/save-icon.png'
import playIcon from 'src/pictures/play-icon.png'
import downloadIcon from 'src/pictures/download-icon.png'
import pauseIcon from 'src/pictures/pause-icon.png'
import backspaceIcon from 'src/pictures/backspace-icon.png'
import generateIcon from 'src/pictures/generate-icon.png'
import crochetLogo from 'src/pictures/crotchet.png'
import demisemiquaverLogo from 'src/pictures/demisemiquaver.png'
import minimLogo from 'src/pictures/minim.png'
import quaverLogo from 'src/pictures/quaver.png'
import semibreveLogo from 'src/pictures/semibreve.png'
import semiquaverLogo from 'src/pictures/semiquaver.png'
import quaverrestLogo from 'src/pictures/quaver-rest.png'
import minimrestLogo from 'src/pictures/minim-rest.png'
import crotchetrestLogo from 'src/pictures/crotchet-rest.png'

import './index.css'

const ToolbarButton = ({onClick, imgSrc, className=''}) => {
  return (
    <Button onClick={onClick} className={`toolbar-button ${className}`}>
      <img className={`button-icon ${className}`} src={imgSrc} src={imgSrc} alt="img"/>
    </Button>
  )
}

const AddButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={addIcon}/>
}

const SaveButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={saveIcon}/>
}

const SemibreveBtn = ({handleClick}) => {
  const onClick = () => { handleClick('semibreve') }
  return <ToolbarButton onClick={onClick} imgSrc={semibreveLogo} className='semibrave'/>
}

const MinimBtn = ({handleClick}) => {
  const onClick = () => { handleClick('minim') }
  return <ToolbarButton onClick={onClick} imgSrc={minimLogo}/>
}

const CrotchetBtn = ({handleClick}) => {
  const onClick = () => { handleClick('crotchet') }
  return <ToolbarButton onClick={onClick} imgSrc={crochetLogo}/>
}

const QuaverBtn = ({handleClick}) => {
  const onClick = () => { handleClick('quaver') }
  return <ToolbarButton onClick={onClick} imgSrc={quaverLogo}/>
}

const SemiQuaverBtn = ({handleClick}) => {
  const onClick = () => { handleClick('semiquaver') }
  return <ToolbarButton onClick={onClick} imgSrc={semiquaverLogo}/>
}

const DemisemiQuaverBtn = ({handleClick}) => {
  const onClick = () => { handleClick('demisemiquaver') }
  return <ToolbarButton onClick={onClick} imgSrc={demisemiquaverLogo}/>
}

const QuaverRestBtn = ({handleClick}) => {
  const onClick = () => { handleClick('quaverrest') }
  return <ToolbarButton onClick={onClick} imgSrc={quaverrestLogo}/>
}

const MinimRestBtn = ({handleClick}) => {
  const onClick = () => { handleClick('minimrest') }
  return <ToolbarButton onClick={onClick} imgSrc={minimrestLogo} className='minimrest'/>
}

const CrotchetRestBtn = ({handleClick}) => {
  const onClick = () => { handleClick('crotchetrest') }
  return <ToolbarButton onClick={onClick} imgSrc={crotchetrestLogo}/>
}

const PlayButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={playIcon}/>
}

const PauseButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={pauseIcon}/>
}

const DownloadButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={downloadIcon}/>
}

const GenerateButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={generateIcon}/>
}

const BackspaceButton = ({handleClick}) => {
  return <ToolbarButton onClick={handleClick} imgSrc={backspaceIcon}/>
}

export {
  AddButton,
  SaveButton,
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
  QuaverRestBtn,
  CrotchetRestBtn, 
  MinimRestBtn
}