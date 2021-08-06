import React, {useEffect} from 'react'
import { GenerateButton, DownloadButton, BackspaceButton, SemibreveBtn, 
  MinimBtn, CrotchetBtn, QuaverBtn, SemiQuaverBtn, DemisemiQuaverBtn,
  SaveButton, QuaverRestBtn, MinimRestBtn, CrotchetRestBtn } from '../Buttons'
import { Form } from 'react-bootstrap'
import { KEY_SIGNATURES, NOTE_RANGES, FIRST_NOTE  } from 'src/constants'


import './index.css'

const Toolbar = ({onChangeNote, onChangeStave, onChangeKeySn, onClickNote, onDownload, onGenerate, onSaveSong, onDeleteNote}) => { 

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
    onChangeNote(FIRST_NOTE)
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
              { KEY_SIGNATURES.map((v, idx) => {
                return <option key={idx}>{v}</option>
              })}
            </Form.Control>
          </div>
          
          <div className='form-item'>
            <Form.Label className="form-label">Note</Form.Label>
            <Form.Control className="form-select" as="select" custom onChange={handleOnChangeNote}>
              { NOTE_RANGES.map((v, idx) => {
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

      <div className='spacing'/>

      <div className='button-toolbar'>                
        <div className='button-group'>
          <MinimRestBtn handleClick={onClickNote}/>
          <CrotchetRestBtn handleClick={onClickNote}/>
          <QuaverRestBtn handleClick={onClickNote}/>
        </div>                    
      </div>
    </div>
  )
}
export default Toolbar
