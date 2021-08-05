import axios from 'axios'
import { API_URL } from 'src/constants'

import authHeader from './auth-header'

export async function generateSong(timeSignature, keySignature, streamParts) {
  const data = { timeSignature, keySignature, streamParts}
  let res = await axios.post(API_URL + 'generate', data, {headers: authHeader()} )
  return res
}

export const saveSong = (timeSignature, keySignature, streamParts, saveName) => {
  const data = { timeSignature, keySignature, streamParts, saveName}
  return axios.post(API_URL + 'save', data, {headers: authHeader()})
}

export const downloadSong = () => {
  return axios.post(API_URL + 'download', {},{ headers: authHeader() })
}

