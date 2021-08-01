import React, { useContext, useState } from 'react'
import Toolbar from '../Toolbar'
import {Score} from '../Score'
import { TopNavbar } from '../About'
import { SongInfoContext } from '../../context/SongInfoContext'
import { generateSong, saveSong, downloadSong } from '../../service/user.service'
import { ErrorDialog, NoInternetDialog } from '../Dialog'

export function MainPage(props) {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     notes: [[], []],
  //     curNote: '',
  //     curClef: ['treble', 'alto'],
  //     firstClef: ['treble', 'alto'],
  //     stave: 0,
  //     keySignature: 'C'

  //   }
  //   this.onClickNote = this.onClickNote.bind(this)
  //   this.onChangeNote = this.onChangeNote.bind(this)
  //   this.onDeleteNote = this.onDeleteNote.bind(this)
  //   this.onGenerate = this.onGenerate.bind(this)
  //   this.onDownload = this.onDownload.bind(this)
  //   this.onChangeClef = this.onChangeClef.bind(this)
  //   this.onChangeStave = this.onChangeStave.bind(this)
  // }
  const [notes, setNotes] = useState([[], []])
  const [curNote, setCurNote] = useState('')
  const [firstClef, setFirstClef] = useState(['treble', 'alto'])
  const [stave, setStave] = useState(0)
  const [keySignature, setKeysignature] = useState('C')
  const [isShowErr, setIsShowErr] = useState(false)
  const [isShowNoConn, setIsShowNoConn] = useState(false)
  const { song, handleSong } = useContext(SongInfoContext)

  const onClickNote = (noteType) => {
    let tmpNote = notes[stave]
    var note = {
      note: curNote,
    }
    if (noteType === 'semibreve') {
      note.dur = 32 
    } else if (noteType === 'minim') {
      note.dur = 16
    } else if (noteType === 'quaver') {
      note.dur = 8
    } else if (noteType === 'crotchet') {
      note.dur = 4
    } else if (noteType === 'semiquaver') {
      note.dur = 2
    } else if (noteType === 'demisemiquaver') {
      note.dur = 1
    }
    tmpNote = tmpNote.concat(note)
    if (stave === 0) {
      const notesOther = notes[1].slice()
      // this.setState({
      //   notes: [tmpNote, notesOther]
      // })
      setNotes([tmpNote, notesOther])
    } else {
      const notesOther = notes[0].slice()
      // this.setState({
      //   notes: [notesOther, tmpNote]
      // })
      setNotes([notesOther, tmpNote])
    }
  }

  const onDeleteNote = () => {
    // const notes = this.state.notes[this.state.stave].slice(0, this.state.notes[this.state.stave].length - 1)
    const tmpNotes = notes[stave].slice(0, notes[stave].length - 1)
    if (stave === 0) {
      const notesOther = notes[1].slice()
      // this.setState({
      //   notes: [notes, notesOther]
      // })
      setNotes([tmpNotes, notesOther])
    } else {
      const notesOther = notes[0].slice()
      // this.setState({
      //   notes: [notesOther, notes]
      // })
      setNotes([notesOther, tmpNotes])
    }
  }

  const onGenerate = () => {
    if (!window.navigator.onLine) {
      setIsShowNoConn(true)
    }
    generateSong(song[0].timeSignature, song[0].keySignature, notes).then((response) => {
      console.log('res', response)
      if (response.status === 200) {
        console.log('from gen', response.data)
        var tmp = response.data
        tmp.saveName = song[0].saveName
        handleSong([tmp])
        setNotes(response.data.streamParts)
      } else {
        setIsShowErr(true)
      }
    }).catch((err) => {
      setIsShowErr(true)
      console.log(err)
    })
  }

  const onChangeKeySn = (keysn) => {
    setKeysignature(keysn)
  }

  const onChangeStave = (stave) => {
    setStave(stave)
  }

  const onChangeNote = (note) => {
    setCurNote(note)
  }

  const onDownload = () => {
    console.log('vo nef ma')
    if (!window.navigator.onLine) {
      setIsShowNoConn(true)
    }
    const FileDownload = require('js-file-download')
    downloadSong().then((response) => {
      FileDownload(response.data, song[0].saveName + '.mid')
    })
  }

  const onSaveSong = () => {
    if (!window.navigator.onLine) {
      setIsShowNoConn(true)
    }
    saveSong(song[0].timeSignature, song[0].keySignature, notes, song[0].saveName)
  }

  return (
    <>  
      <ErrorDialog
        show={isShowErr}
        onHide = {() => setIsShowErr(false)}/>
      <NoInternetDialog
        show = {isShowNoConn}
        onHide = {() => setIsShowNoConn(false)}/>
      <TopNavbar/>
      <Toolbar
        onClickNote={onClickNote}
        onChangeNote={onChangeNote}
        onDeleteNote={onDeleteNote}
        onGenerate={onGenerate}
        onDownload={onDownload}  
        // onChangeClef={onChangeClef} 
        onChangeKeySn={onChangeKeySn}
        onChangeStave={onChangeStave}  
        onSaveSong={onSaveSong}               
      />
      <Score notes={notes}
        onDeleteNote={onDeleteNote}
        firstClef={firstClef}
        keySignature={keySignature}
      />
    </>
  )
}
