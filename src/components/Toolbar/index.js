import React, {useEffect} from 'react'
import { GenerateButton, DownloadButton, BackspaceButton, SemibreveBtn, 
  MinimBtn, CrotchetBtn, QuaverBtn, SemiQuaverBtn, DemisemiQuaverBtn, SaveButton } from '../Buttons'
import { Form } from 'react-bootstrap'

import './index.css'

const Toolbar = ({onChangeNote, onChangeStave, onChangeKeySn, onClickNote, onDownload, onGenerate, onSaveSong, onDeleteNote}) => { 
  const keySignatures = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'B-', 'E-', 'A-',
    'D-', 'G-', 'C-']
  const noteRange = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3',
    'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6']

  const handleOnChangeStave = (e) => {
    onChangeStave(Number(e.target.value))
  }

  const handleOnChangeKeySn = (e) => { 
    onChangeKeySn(e.target.value)
  }

  const handleOnChangeNote = (e) => {
    onChangeNote(e.target.value)
  }

  useEffect(() => {
    onChangeNote('C/2')
  }, [])

  return (
    <div className='toolbar-container'>
      <div className='button-toolbar'>
        <div className='button-group'>
          <DownloadButton handleClick={onDownload}/>
          <GenerateButton handleClick={onGenerate}/>
          <SaveButton handleClick={onSaveSong}/>
          <BackspaceButton handleClick={onDeleteNote}/>
        </div>
      </div>
      <div className='spacing'/>
      <Form className='toolbar-form'>

        <Form.Group controlId="selectMode">
          <div className='form-item'>
            <Form.Label className="form-label">Mode input</Form.Label>
            <Form.Control className="form-select" as="select" custom>
              <option>Note</option>
              <option disabled>Chord</option>
            </Form.Control>
          </div>

          <div className='form-item'>
            <Form.Label className="form-label">Stave</Form.Label>
            <Form.Control className="form-select" as="select" custom onChange={handleOnChangeStave}>
              <option value='0'>1</option>
              <option value='1'>2</option>
            </Form.Control>
          </div>
          
          <div className='form-item'>
            <Form.Label className="form-label">Key Signature</Form.Label>
            <Form.Control className="form-select" as="select" custom onChange={handleOnChangeKeySn}>
              { keySignatures.map((v, idx) => {
                return <option key={idx}>{v}</option>
              })}
            </Form.Control>
          </div>
          
          <div className='form-item'>
            <Form.Label className="form-label">Note</Form.Label>
            <Form.Control className="form-select" as="select" custom onChange={handleOnChangeNote}>
              { noteRange.map((v, idx) => {
                return <option key={idx}>{v}</option>
              })}
            </Form.Control>
          </div>
          
        </Form.Group>
      </Form>

      <div className='spacing'/>

      <div className='button-toolbar'>
        <div className='button-group'>
          <SemibreveBtn handleClick={onClickNote}/>
          <MinimBtn handleClick={onClickNote}/>
          <QuaverBtn handleClick={onClickNote}/>
        </div>
      </div>

      <div className='spacing'/>

      <div className='button-toolbar'>                
        <div className='button-group'>
          <CrotchetBtn handleClick={onClickNote}/>
          <SemiQuaverBtn handleClick={onClickNote}/>
          <DemisemiQuaverBtn handleClick={onClickNote}/>
        </div>                    
      </div>
    </div>
  )
}
export default Toolbar
