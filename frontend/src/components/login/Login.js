import React, { useState } from 'react'
import Button from '../button/Button'
import Input from '../input/Input'
import Title from '../title/Title'
import './login.css'

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className='main-container'>
      <div className='form-container'>
        <center>
          <Title title={props.heading} />
          <p className='for'>For {props.for}</p>
        </center>
        <Input placeholder='E-Mail Address' type='email' setValue={setEmail} />
        <Input placeholder='Password' type='password' setValue={setPassword} />
        <Button text='Login' onClick={async () => { props.onLoginClick(email, password) }} />
        <p className='end-text'>Don't have an account? <a onClick={props.onEndClick} className='end-link'>Register</a></p>
      </div>
    </div>
  )
}

export default Login