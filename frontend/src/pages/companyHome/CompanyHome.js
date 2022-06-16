import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Title from '../../components/title/Title';
import './companyhome.css'
import PostedJobs from './PostedJobs';
import PostJob from './PostJob';
const CompanyHome = () => {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.setItem("auth-token", "")
        navigate('/',{ replace: true })
    }
    useEffect(() => {
        if (!sessionStorage.getItem('auth-token')) {
            setTimeout(() => {
                navigate("/");
            }, 500);
        }
    }, [])

    return (
        <div className='company-home-container'>
            <h1 className='company-heading'>Post Your Job</h1>
            <PostJob />
            <h1 className='company-heading'>Your Posted Jobs</h1>
            <PostedJobs />
            <i class="fa-solid fa-arrow-right-from-bracket logout" onClick={logout}></i>
        </div>
    )
}

export default CompanyHome