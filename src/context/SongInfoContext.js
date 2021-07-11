import { createContext, useState } from "react";

export const SongInfoContext = createContext();

export const SongInfoContextProvider = (props) => {
    const [input, setInput] = useState({author: '', title: '', timeSignature: ''})
    const [isLogin, setIsLogin] = useState(false);
    const handleIsLogin = (v) => { setIsLogin(v); };
    const handleInput = (author, title, timeSignature) => { setInput({ author: author, title: title, timeSignature: timeSignature }) }
    return (
        <SongInfoContext.Provider value={{ input, handleInput, isLogin, handleIsLogin}}>
            {props.children}
        </SongInfoContext.Provider>
    )
}