import React,from 'react'

import './index.css'

const Selector = ({
    label,
    value,
    onChange,
    name = '',
    className = '',
    }) => {

    return (
        <div className={`selector ${className}`}>
        <div className='label'>{label}</div>
        <div className='selector-wrapper'>
            <select
            name={name}
            className='input'
            value={value}
            onChange={onChange}
            ></select>
        </div>
        </div>
    )
}

export default Selector