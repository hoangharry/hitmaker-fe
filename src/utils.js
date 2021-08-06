import Vex from 'vexflow'
import { TREB_NOTES, ALTO_NOTES, BASS_NOTES, MAP_DURATION } from 'src/constants'

export const buildRest = (clef, duration) => {
  var key = ''
  if (clef == 'treble') {
    key = 'B/4'
  } else if (clef == 'alto') {
    key = 'C/4'
  } else if (clef == 'bass') {
    key = 'D/3'
  }
  return { 
    clef: clef, 
    keys: [key], 
    duration: `${duration}r`
  }
}

export const getBeatPerBar = (timeSig) => { 
  if (timeSig === undefined || timeSig === '') {
    return 0
  }
  if (timeSig=== '4/4') {
    return 32
  }
  if (timeSig === '3/4') {
    return 24
  }
  if (timeSig === '2/4') {
    return 16
  }
}

export const getRemainBeats = (notes, beatPerBar) => { 
  const totalBeat = notes.reduce((currentBeats, note) => { return currentBeats + note.dur}, 0)
  return totalBeat % beatPerBar === 0 ? 0 : beatPerBar - totalBeat % beatPerBar

}

// return array of VextFlowStaveNote
export const asVFNotes = (notes) => {
  let draw_notes = []
  // handle single notes

  // handle chords

  // handle rest
  
  return draw_notes
} 

export const handleKeySignature = () => { 

}

export const fillWithRest = (timeSig, clef, notes) => {
  let beatPerBar = getBeatPerBar(timeSig)
  if (beatPerBar === 0) { return [] } 
  let remainder = getRemainBeats(notes, beatPerBar)
  for (let i = 16; i != 1; i = i/2) {
    if (i > remainder) { continue }
    notes.push(buildRest(clef, MAP_DURATION.get(i)))
    remainder = remainder - i
    if (remainder === 0) { break } 
  }
  return notes
}