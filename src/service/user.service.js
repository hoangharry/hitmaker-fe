import axios from 'axios'

import authHeader from './auth-header'

const API_URL = 'http://127.0.0.1:4000/'

export const generateSong = (timeSignature, keySignature, streamParts) => {
  const data = { timeSignature, keySignature, streamParts}
  return axios.post(API_URL + 'generate', { headers: authHeader(), params: data})
}

export const saveSong = (timeSignature, keySignature, streamParts) => {
  const data = { timeSignature, keySignature, streamParts}
  return axios.post(API_URL + 'save', { headers: authHeader(), params: data})
}

export const downloadSong = () => {
  return axios.post(API_URL + 'download', { headers: authHeader() })
}

