import axios from 'axios'

const API_URL = 'http://127.0.0.1:4000/'

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

export const logout = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('name')
}


