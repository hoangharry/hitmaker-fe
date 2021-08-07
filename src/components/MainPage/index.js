import React, { useContext, useState } from 'react'
import Toolbar from 'src/components/Toolbar'
import {Score} from 'src/components/Score'
import Loading from 'src/components/Loading'
import { TopNavbar } from 'src/components/About'
import { SongInfoContext } from 'src/context/SongInfoContext'
import { generateSong, saveSong, downloadSong } from 'src/service/user.service'
import { ErrorDialog, NoInternetDialog } from 'src/components/Dialog'
import { DEFAULT_CLEF } from 'src/constants'

import './index.css'

export function MainPage(props) {
  const [showLoading, setShowLoading] = useState(false)
  const [notes, setNotes] = useState([[], []])
  const [curNote, setCurNote] = useState('')
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
      setNotes([tmpNote, notesOther])
    } else {
      const notesOther = notes[0].slice()
      setNotes([notesOther, tmpNote])
    }
  }

  const onDeleteNote = () => {
    const tmpNotes = notes[stave].slice(0, notes[stave].length - 1)
    if (stave === 0) {
      const notesOther = notes[1].slice()
      setNotes([tmpNotes, notesOther])
    } else {
      const notesOther = notes[0].slice()
      setNotes([notesOther, tmpNotes])
    }
  }

  const onGenerate = () => {
    if (!window.navigator.onLine) {
      setIsShowNoConn(true)
    }
    else {
      setShowLoading(true)
      generateSong(song[0].timeSignature, song[0].keySignature, notes).then((response) => {
        console.log('res', response)
        if (response.status === 200) {
          console.log('from gen', response.data)
          var tmp = response.data
          tmp.saveName = song[0].saveName
          handleSong([tmp])
          setNotes([[], []])
          setShowLoading(false)
        } else {
          setShowLoading(false)
          setIsShowErr(true)
        }
      }).catch((err) => {
        setShowLoading(false)
        setIsShowErr(true)
        console.log(err)
      })
    }
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
      <div div className="main-page-container">
        {showLoading && <Loading />}
        <TopNavbar/>
        <div className="main-page">
          <Toolbar
            onClickNote={onClickNote}
            onChangeNote={onChangeNote}
            onDeleteNote={onDeleteNote}
            onGenerate={onGenerate}
            onDownload={onDownload}  
            onChangeKeySn={onChangeKeySn}
            onChangeStave={onChangeStave}  
            onSaveSong={onSaveSong}               
          />
          <Score notes={notes}
            onDeleteNote={onDeleteNote}
            firstClef={DEFAULT_CLEF}
            keySignature={keySignature}
          />
        </div>
      </div>
    </>
  )
}
