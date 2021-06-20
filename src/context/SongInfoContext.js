import { createContext, useState } from "react";

export const SongInfoContext = createContext();

export const SongInfoContextProvider = (props) => {
    const [input, setInput] = useState({author: '', title: '', timeSignature: ''})
    const handleInput = (author, title, timeSignature) => { setInput({ author: author, title: title, timeSignature: timeSignature }) }
    return (
        <SongInfoContext.Provider value={{ input, handleInput}}>
            {props.children}
        </SongInfoContext.Provider>
    )
}