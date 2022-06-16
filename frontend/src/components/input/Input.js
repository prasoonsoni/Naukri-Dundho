import React from 'react'
import './input.css'

const Input = (props) => {
  const handleOnChange = (event) => {
    props.setValue(event.target.value)
  }
  return (
    <input type={props.type} id={props.id} className='input' onChange={handleOnChange} placeholder={props.placeholder} />
  )
}

export default Input