import { createContext, useState, useEffect } from 'react'

export const SongInfoContext = createContext({
  input: {
    title: '',
    timeSignature: '',
    keySignature: '',
  },
  isLogin: false,
  nameUsr: '',
  song: [],
  handleSong: (v) => {},
  setSongInfo: (title, timeSignature) => {},
  logout: () => {},
  login: (username, token) => {},
})

export const SongInfoContextProvider = (props) => {
  const [input, setInput] = useState({
    title: '',
    timeSignature: '',
    keySignature: '',
  })
  const [isLogin, setIsLogin] = useState(false)
  const [nameUsr, setNameUsr] = useState('')
  const [song, setSong] = useState([])
  const handleSong = (v) => {
    setSong(v)
  }

  const handleInput = (title, timeSignature, keySignature) => {
    setInput({
      title: title,
      timeSignature: timeSignature,
      keySignature: keySignature,
    })
  }

  useEffect(() => {
    const userName = sessionStorage.getItem('name')
    console.log(userName)
    if (userName !== 'undefined') {
      setNameUsr(userName)
      setIsLogin(true)
    }
    const title = localStorage.getItem('title')
    const timeSignature = localStorage.getItem('timeSignature')
    const keySignature = localStorage.getItem('keySignature')
    console.log(title, timeSignature, keySignature)
    if (
      title !== 'null' &&
      timeSignature !== 'null' &&
      keySignature !== 'null'
    ) {
      handleInput(title, timeSignature, keySignature)
    }
  }, [])

  const setSongInfo = (title, timeSignature, keySignature) => {
    localStorage.setItem('title', title)
    localStorage.setItem('timeSignature', timeSignature)
    localStorage.setItem('keySignature', keySignature)
    handleInput(title, timeSignature, keySignature)
  }

  const login = (username, token) => {
    console.log('==========')
    sessionStorage.setItem('name', username)
    sessionStorage.setItem('token', token)
    setNameUsr(username)
    setIsLogin(true)
  }

  const logout = (username, token) => {
    sessionStorage.setItem('name', username)
    sessionStorage.setItem('token', token)
    localStorage.removeItem('title')
    localStorage.removeItem('timeSignature')
    localStorage.removeItem('keySignature')
    setNameUsr('')
    setIsLogin(false)
    setSong([])
    setInput({ title: '', timeSignature: '', keySignature: '' })
  }

  return (
    <SongInfoContext.Provider
      value={{
        input: input,
        isLogin: isLogin,
        nameUsr: nameUsr,
        song: song,
        handleSong: handleSong,
        setSongInfo: setSongInfo,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </SongInfoContext.Provider>
  )
}
