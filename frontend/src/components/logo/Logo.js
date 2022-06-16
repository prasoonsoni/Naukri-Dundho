import React from 'react'
import { useNavigate } from 'react-router-dom'
import './logo.css'
const Logo = () => {
    const navigate = useNavigate()
    return (
        <img src="./assets/logo-white.png" className='logo' onClick={() => { navigate('/') }} />
    )
}

export default Logo