export const  API_URL = process.env.REACT_APP_API_URL

export const DEFAULT_CLEF = ['treble', 'bass']

export const KEY_SIGNATURES = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'B-', 'E-', 'A-',
  'D-', 'G-', 'C-']

export const NOTE_RANGES = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3',
  'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6']

export const TREB_NOTES = ['C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5', 'D/5', 'E/5', 'F/5', 'G/5', 'A/5', 'B/5', 'C/6']

export const ALTO_NOTES = ['C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'A/4', 'B/4', 'C/5']

export const BASS_NOTES = ['C/2', 'D/2', 'E/2', 'F/2', 'G/2', 'A/2', 'B/2', 'C/3', 'D/3', 'E/3', 'F/3', 'G/3', 'A/3', 'B/3', 'C/4']

export const FIRST_NOTE = 'C/2'

export const MAP_DURATION = new Map([
  [32, '1'],
  [16, '2'],
  [8, '4'], 
  [4, '8'],
  [2, '16'],
  [1, '32'],
  [24, '2d'],
  [12, '4d'],
  [6, '8d'],
  [3, '16d']
])

export const PATH = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  DOWNLOAD: '/download',
  SAVE: '/save',
  GENERATE: '/generate'
}