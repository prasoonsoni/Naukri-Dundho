import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './applicanthome.css'
const ApplicantHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.getItem('auth-token')) {
            setTimeout(() => {
                navigate("/");
            }, 500);
        }
    }, [])
    return (
        <div className='applicant-home-container'>
            <h1 className='applicant-heading'>Jobs Available</h1>
            <h1 className='applicant-heading'>Jobs Applied</h1>
        </div>
    )
}

export default ApplicantHome