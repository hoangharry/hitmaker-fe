import { createContext, useState } from 'react'

export const SongInfoContext = createContext()

export const SongInfoContextProvider = (props) => {
  const [input, setInput] = useState({title: '', timeSignature: ''})
  const [isLogin, setIsLogin] = useState(false)
  const [nameUsr, setNameUsr] = useState('')
  const [song, setSong] = useState([])
  const handleSong = (v) => { console.log(v); setSong(v) }  
  const handleNameUsr = (v) => { setNameUsr(v) }
  const handleIsLogin = (v) => { setIsLogin(v) }
  const handleInput = (title, timeSignature) => { setInput({title: title, timeSignature: timeSignature }) }
  // var songTmp = {   
  //   timeSignature: '3/4',
  //   keySignature: 'D',
  //   streamParts: [
  //     [{
  //       chord: ['F/4', 'E/5', 'B#/4'],
  //       dur: '16'
  //     },
  //     {
  //       note: 'F/4',
  //       dur: '8'
  //     },
  //     {
  //       keySignature: 'B-',
  //       note: 'F/4',
  //       dur: '24'
  //     },
  //     // {
  //     //   dur: '4'
  //     // },
  //     ],
  //     [{
  //       note: 'F/4',
  //       dur: '16'
  //     },
  //     {
  //       note: 'F/4',
  //       dur: '8'
  //     }
  //     ]]
  // }
  // handleSong(songTmp)
  return (
    <SongInfoContext.Provider value={{ input, handleInput, isLogin, handleIsLogin,
      nameUsr, handleNameUsr, song, handleSong}}>
      {props.children}
    </SongInfoContext.Provider>
  )
}