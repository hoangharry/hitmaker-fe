import axios from 'axios'
import { API_URL } from 'src/constants'

export const register = (usrname, pwd, name) => {
  console.log('url', API_URL)
  return axios.post(API_URL + 'signup', {
    username: usrname,
    password: pwd,
    name: name,
  })
}

export const login = (usrname, pwd) => {
  return axios.post(API_URL + 'login', {
    username: usrname,
    password: pwd,
  })
}
