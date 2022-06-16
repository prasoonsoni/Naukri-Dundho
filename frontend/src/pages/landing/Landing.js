import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../components/title/Title'
import Tagline from '../../components/tagline/Tagline'
import Banner from '../../components/banner/Banner'
import Button from '../../components/button/Button'

import './landing.css'
import Logo from '../../components/logo/Logo'
const Landing = () => {
  const navigate = useNavigate()
  return (
    <>
      <Logo />
      <div className='landing-container'>
        <div className='item-container'>
          <Title title='Naukri Dundho' />
          <Tagline />
          <div className='button-container'>
            <Button text='Find a Job' onClick={() => { navigate('/applicant') }} />
            <Button text='Post a Job' onClick={() => { navigate('/company') }} />
          </div>
        </div>
        <div className='banner-container'>
          <Banner />
        </div>
      </div>
    </>

  )
}

export default Landing