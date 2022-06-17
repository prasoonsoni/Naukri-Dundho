import React from 'react'
import './companyhome.css'

const Applicant = (props) => {
  return (
    <div className='applicant-card'>
        <p className='applicant-name'>{props.name}</p>
        <p className='applicant-description'>{props.description}</p>
        <p className='applicant-email'>{props.email}</p>
    </div>
  )
}

export default Applicant