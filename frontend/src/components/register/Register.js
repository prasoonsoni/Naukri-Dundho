import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import Input from '../input/Input'
import Title from '../title/Title'
import './register.css'

const Register = (props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [about, setAbout] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className='main-container'>
      <div className='form-container'>
        <center>
          <Title title={props.heading} />
          <p className='for'>For {props.for}</p>
        </center>
        <Input placeholder='Name' setValue={setName} type='text' />
        <Input placeholder='About' setValue={setAbout} type='text'/>
        <Input placeholder='E-Mail Address' setValue={setEmail}type='email' />
        <Input placeholder='Password' setValue={setPassword}type='password' />
        <Button text='Register' onClick={async () => { props.onRegisterClick(name, email, password, about) }} />
        <p className='end-text'>Already have an account? <a onClick={props.onEndClick} className='end-link'>Login</a></p>
      </div>
    </div>
  )
}

export default Register