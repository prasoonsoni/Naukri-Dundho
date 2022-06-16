import React from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../../banner/Banner'
import Button from '../../button/Button'
import Tagline from '../../tagline/Tagline'
import Title from '../../title/Title'
import './landing.css'
const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className='landing-container'>
      <div className='item-container'>
        <Title title='Naukri Dundho' />
        <Tagline />
        <div className='button-container'>
          <Button text='Find a Job' onClick={() => { navigate('/applicant', { replace: true }) }} />
          <Button text='Post a Job' onClick={() => { navigate('/company', { replace: true }) }} />
        </div>
      </div>
      <div className='banner-container'>
        <Banner />
      </div>
    </div>
  )
}

export default Landing