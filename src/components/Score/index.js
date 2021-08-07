import Vex from 'vexflow'
import React, { lazy, useContext, useEffect, useState} from 'react'
import {ExceedNotesDialog} from 'src/components/Dialog'
import { SongInfoContext } from 'src/context/SongInfoContext'
import { useHistory } from 'react-router-dom'

import './index.css'

export function Score(props) {
  const VF = Vex.Flow
  const [showModal, setShowModal] = useState(false)
  let mapDuration = new Map()
  mapDuration.set(32, '1')
  mapDuration.set(16, '2')
  mapDuration.set(8, '4')
  mapDuration.set(4, '8')
  mapDuration.set(2, '16')
  mapDuration.set(1, '32')
  mapDuration.set(24, '2d')
  mapDuration.set(12, '4d')
  mapDuration.set(3, '16d')
  mapDuration.set(6, '8d')
  const { song } = useContext(SongInfoContext)
  const history = useHistory()
  if (song === undefined || song[0] === undefined ||
      song[0].timeSignature === undefined || song[0].timeSignature === '') {
    history.push('/init')
  }

  console.log('song', song)
  let beatsPerBar = 0
  if (song[0].timeSignature === '4/4') {
    beatsPerBar = 32
  }
  if (song[0].timeSignature === '3/4') {
    beatsPerBar = 24
  }
  if (song[0].timeSignature === '2/4') {
    beatsPerBar = 16
  }

  const checkNotes = (notes) => {
    let numNotesAdd = 0
    let sumDuration = 0
    notes.forEach((e) => {
      sumDuration += e.dur
    })
    if (sumDuration % beatsPerBar === 0) {
    } else {
      let remainder = Math.ceil(sumDuration/beatsPerBar)*beatsPerBar - sumDuration
      for (let i = 16; i !== 0; i = Math.trunc(i/2)) {
        const quotient = Math.floor(remainder/i)
        if (quotient === 0) {
          continue
        } else {
          numNotesAdd += quotient
          let duration = [...mapDuration.entries()].find(([k, v]) => k === i)[1]
          for (let j = 0; j < quotient; j++) {
            notes.push(new VF.StaveNote({keys: ['D/4'], duration: duration}))
          }
          remainder %= i
          if (remainder === 0) {
            break
          }
        }
      }
    }
    return {notes, numNotesAdd}
  }

  const notesTreble = ['C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6']
  const notesAlto = ['C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5']
  const notesBass = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4']

  const drawNotes = (staveN, context, svgContainer, props) => {
    const width = svgContainer.getBoundingClientRect().width
    let notes = props.notes[staveN]
    if (song[0].streamParts[staveN] !== undefined) {
      if (song[0].streamParts[staveN].length === 0) {
        return
      }
      notes = song[0].streamParts[staveN]
    }
    if (notes.length === 0) {
      var stave
      if (staveN === 1) {
        stave = new VF.Stave(10, 100, width)
      } else {
        stave = new VF.Stave(10, 0, width)
      }
      if (song[0].keySignature != '') {
        var keySnSong = song[0].keySignature
        if (song[0].keySignature.includes('-')) {
          keySnSong = keySnSong.slice(0, -1) + 'b'
        }
        stave.addKeySignature(keySnSong)
      }
      stave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature)
      stave.setContext(context).draw()
    } else {
      let curClef = props.firstClef[staveN]
      let tmpduration = 0, staveX = 10, staveY = 0
      if (staveN === 1) {
        staveY = 100
      }
      let prevStave
      var tmpNotes = []
      var isFisrt = true
      var keySn = ''
      var catchRest = 0
      var ties = []
      var tieInfo = {f: null, l: null}
      notes.forEach((v, idx) => {
        console.log(v)
        if (v.note) {
          tmpduration += parseInt(v.dur)
          let tmpClefNotes
          if (curClef === 'treble') {
            tmpClefNotes = notesTreble
          } else if (curClef === 'alto') {
            tmpClefNotes = notesAlto
          } else {
            tmpClefNotes = notesBass
          }
          if (!tmpClefNotes.includes(v.note)) {
            if (notesTreble.includes(v.note)) {
              tmpNotes.push(new VF.ClefNote('treble'))
              curClef = 'treble'
            } else if (notesAlto.includes(v.note)) {
              tmpNotes.push(new VF.ClefNote('alto'))
              curClef = 'alto'
            } else {
              tmpNotes.push(new VF.ClefNote('bass'))
              curClef = 'bass'
            }
          }
          if (v.keySignature){
            keySn = v.keySignature
            if (keySn.includes('-')) {
              keySn = keySn.slice(0, -1) + 'b'
            }
          }
          if (mapDuration.get(parseInt(v.dur)).includes('d')) {
            tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [v.note], duration: mapDuration.get(parseInt(v.dur)), auto_stem: true}).addDotToAll())
          } else {
            tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [v.note], duration: mapDuration.get(parseInt(v.dur)), auto_stem: true}))
          }
          if (v.tie == 'start') {
            tieInfo.f = tmpNotes[tmpNotes.length -1]
          } else if (v.tie == 'stop') {
            tieInfo.l = tmpNotes[tmpNotes.length - 1]
            ties.push(new VF.StaveTie({
              first_note: tieInfo.f,
              last_note: tieInfo.l
            }))
            tieInfo = {f: null, l: null}
          }
        } else if (v.chord) {
          tmpduration += parseInt(v.dur)
          let tmpClefNotes
          if (curClef === 'treble') {
            tmpClefNotes = notesTreble
          } else if (curClef === 'alto') {
            tmpClefNotes = notesAlto
          } else {
            tmpClefNotes = notesBass
          }
          if (!tmpClefNotes.includes(v.chord[0].note)) {
            if (notesTreble.includes(v.chord[0].note)) {
              tmpNotes.push(new VF.ClefNote('treble'))
              curClef = 'treble'
            } else if (notesAlto.includes(v.chord[0].note)) {
              tmpNotes.push(new VF.ClefNote('alto'))
              curClef = 'alto'
            } else {
              tmpNotes.push(new VF.ClefNote('bass'))
              curClef = 'bass'
            }
          }
          if (v.keySignature) {
            keySn = v.keySignature
            if (keySn.includes('-')) {
              keySn = keySn.slice(0, -1) + 'b'
            }
          }
          var chordNote = []
          v.chord.forEach((n) => {
            chordNote.push(n.note)
          })
          if (mapDuration.get(parseInt(v.dur)).includes('d')) {
            tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: chordNote, duration: mapDuration.get(parseInt(v.dur)), auto_stem: true}).addDotToAll())
          } else {
            tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: chordNote, duration: mapDuration.get(parseInt(v.dur)), auto_stem: true}))
          }
          v.chord.forEach((n) => {
            if (n.tie == 'start') {
              tieInfo.f = tmpNotes[tmpNotes.length -1]
            } else if (n.tie == 'stop') {
              tieInfo.l = tmpNotes[tmpNotes.length - 1]
              ties.push(new VF.StaveTie({
                first_note: tieInfo.f,
                last_note: tieInfo.l
              }))
              tieInfo = {f: null, l: null}
            }
          })
        } else {
          var note = ''
          if (curClef == 'treble') {
            note = 'B/4'
          } else if (curClef == 'alto') {
            note = 'C/4'
          } else if (curClef == 'bass') {
            note = 'D/3'
          }
          var leftDuration = beatsPerBar - tmpduration
          console.log('leftDuration', leftDuration)
          console.log('tmodur', tmpduration)
          if (parseInt(v.dur) > leftDuration) {
            console.log('o tren duration', mapDuration.get(parseInt(leftDuration)) + 'r')
            if (mapDuration.get(leftDuration).includes('d')) {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(leftDuration)) + 'r'}).addDotToAll())
            } else {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(leftDuration)) + 'r'}))
            }
            catchRest = parseInt(v.dur) - leftDuration
            tmpduration = tmpduration + leftDuration

          } else {
            tmpduration += parseInt(v.dur)
            if (mapDuration.get(parseInt(v.dur)).includes('d')) {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(v.dur)) + 'r'}).addDotToAll())
            } else {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(v.dur)) + 'r'}))
            }
          }          
        }      
                
        var tmpStave
        if (tmpduration > beatsPerBar) {
          setShowModal(true)
          props.onDeleteNote()
        }
        if (tmpduration === beatsPerBar) {
          if (isFisrt) {
            var l = tmpNotes.length > 4 ? tmpNotes.length*50 : tmpNotes.length*50 + 100
            tmpStave = new VF.Stave(staveX, staveY, l)
            tmpStave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature)
            if (song[0].keySignature != '') {
              var keySnSong = song[0].keySignature
              if (song[0].keySignature.includes('-')) {
                keySnSong = keySnSong.slice(0, -1) + 'b'
              }
              tmpStave.addKeySignature(keySnSong)
            }
            // draw beam and all stave
            var beams = VF.Beam.generateBeams(tmpNotes)
            tmpStave.setContext(context).draw()
            VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes)
            beams.forEach((b) => b.setContext(context).draw())
            prevStave = tmpStave
            isFisrt = false
          } else {
            const noteWidth = Math.trunc((width - (prevStave.x + prevStave.width) - 10)/tmpNotes.length)
            l = tmpNotes.length > 4 ? tmpNotes.length*50 : tmpNotes.length*50 + 100
            if (noteWidth < 20) {
              staveX = 10
              staveY += 200
              tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50).addClef(curClef).addTimeSignature(song[0].timeSignature)
            } else if (noteWidth < 50) {
              tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*noteWidth)
            } else if (tmpNotes.length < 3) {
              tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, l)
            } else {
              tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*50)
            }
            if (keySn != '') {
              tmpStave.addKeySignature(keySn)
              keySn = ''
            }
            // draw beam and all stave
            beams = VF.Beam.generateBeams(tmpNotes)
            tmpStave.setContext(context).draw()
            VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes)
            beams.forEach((b) => b.setContext(context).draw())
            prevStave = tmpStave
          }
          while (catchRest >= beatsPerBar) {
            if (curClef == 'treble') {
              note = 'B/4'
            } else if (curClef == 'alto') {
              note = 'C/4'
            } else if (curClef == 'bass') {
              note = 'D/3'
            }
            tmpNotes = []
            console.log('while duration', mapDuration.get(beatsPerBar) + 'r')
            if (mapDuration.get(parseInt(beatsPerBar)).includes('d')) {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(beatsPerBar) + 'r'}).addDotToAll())
            } else {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(beatsPerBar) + 'r'}))
            }
            const noteWidth = Math.trunc((width - (prevStave.x + prevStave.width) - 10)/1)
            if (noteWidth < 20) {
              staveX = 10
              staveY += 200
              tmpStave = new VF.Stave(staveX, staveY, tmpNotes.length*50).addClef(curClef).addTimeSignature(song[0].timeSignature)
            } else if (noteWidth < 50) {
              tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*noteWidth)
            } else {
              tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, tmpNotes.length*50)
            }
            tmpStave.setContext(context).draw()
            VF.Formatter.FormatAndDraw(context, tmpStave, tmpNotes)
            catchRest = catchRest - beatsPerBar
            prevStave = tmpStave
          }
          tmpNotes = []
          tmpduration = 0
          if (catchRest > 0) {
            if (curClef == 'treble') {
              note = 'B/4'
            } else if (curClef == 'alto') {
              note = 'C/4'
            } else if (curClef == 'bass') {
              note = 'D/3'
            }
            console.log('catchrest', catchRest)
            console.log('catchrest rest', mapDuration.get(parseInt(catchRest)) + 'r')
            if (mapDuration.get(catchRest).includes('d')) {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(catchRest)) + 'r'}).addDotToAll())
            } else {
              tmpNotes.push(new VF.StaveNote({ clef: curClef, keys: [note], duration: mapDuration.get(parseInt(catchRest)) + 'r'}))
            }
            tmpduration = catchRest
            console.log('tmpduration catchRest', tmpduration)
            catchRest = 0
          }
        } else {          
          if (idx === notes.length - 1) {
            var lastStave = checkNotes(tmpNotes)
            if (isFisrt) {
              l = tmpNotes.length > 4 ? tmpNotes.length*50 : tmpNotes.length*50 + 100
              tmpStave = new VF.Stave(staveX, staveY, l)
              tmpStave.addClef(props.firstClef[staveN]).addTimeSignature(song[0].timeSignature)
              if (song[0].keySignature != '') {
                keySnSong = song[0].keySignature
                if (song[0].keySignature.includes('-')) {
                  keySnSong = keySnSong.slice(0, -1) + 'b'
                }
                tmpStave.addKeySignature(keySnSong)
              }
              tmpStave.setContext(context).draw()
              VF.Formatter.FormatAndDraw(context, tmpStave, lastStave.notes)
            } else {
              if (prevStave.x + prevStave.width + lastStave.notes.length*50 > 0.9*svgContainer.getBoundingClientRect().width) {
                staveX = 10
                staveY += 200
                tmpStave = new VF.Stave(staveX, staveY, lastStave.notes.length*50).addClef(curClef).addTimeSignature(song[0].timeSignature)
              } else {
                tmpStave = new VF.Stave(prevStave.width + prevStave.x, staveY, lastStave.notes.length*50)
              }
              if (keySn != '') {
                tmpStave.addKeySignature(keySn)
                keySn = ''
              }
              tmpStave.setContext(context).draw()
              VF.Formatter.FormatAndDraw(context, tmpStave, lastStave.notes)
            }
            const vfNotes = document.getElementsByClassName('vf-stavenote')
            for (let i = 1; i <= lastStave.numNotesAdd; i++) {
              vfNotes[vfNotes.length - i].setAttribute('hidden', true)
            }
          }                
        }
      })
      console.log('ties', ties)
      ties.forEach(function(b) {b.setContext(context).draw()})
    }
  }

    

  useEffect(() => {
    document.getElementById('new-song').innerHTML = ''
    var notesProp = props.notes
    const svgContainer = document.getElementById('new-song')
        
    var renderer = new VF.Renderer(svgContainer, VF.Renderer.Backends.SVG)
    const width = svgContainer.getBoundingClientRect().width
    renderer.resize(width, 1000)
    var context = renderer.getContext()
    drawNotes(0, context, svgContainer, props)
    drawNotes(1, context, svgContainer, props)
  })

  return (
    <>
      <ExceedNotesDialog
        show={showModal}
        onHide={() => setShowModal(false)}
      />
      <div className="song-container">
        <h5 className="song-title" >{song[0].saveName}</h5>
        <div className="song-content" id="new-song"></div>
      </div>
    </>
  )
}
