import { createContext, useState } from 'react'

export const SongInfoContext = createContext()

export const SongInfoContextProvider = (props) => {
  const [input, setInput] = useState({title: '', timeSignature: ''})
  const [isLogin, setIsLogin] = useState(false)
  const [nameUsr, setNameUsr] = useState('')
  const [song, setSong] = useState([])
  const handleSong = (v) => { setSong(v) }  
  const handleNameUsr = (v) => { setNameUsr(v) }
  const handleIsLogin = (v) => { setIsLogin(v) }
  const handleInput = (title, timeSignature) => { setInput({title: title, timeSignature: timeSignature }) }
  return (
    <SongInfoContext.Provider value={{ input, handleInput, isLogin, handleIsLogin,
      nameUsr, handleNameUsr, song, handleSong}}>
      {props.children}
    </SongInfoContext.Provider>
  )
}