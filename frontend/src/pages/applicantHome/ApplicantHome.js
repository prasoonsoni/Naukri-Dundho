import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import './applicanthome.css'
import Job from './Job'
const BASE_URL = process.env.REACT_APP_BASE_URL

const ApplicantHome = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState([])
    const logout = () => {
        sessionStorage.setItem("auth-token", "")
        navigate('/', { replace: true })
    }
    useEffect(() => {
        if (!sessionStorage.getItem('auth-token')) {
            setTimeout(() => {
                navigate("/");
            }, 500);
        }
    }, [])
    useEffect(() => {
        const getJobs = async () => {
            const response = await fetch(`${BASE_URL}/job/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("auth-token"),
                },
            });
            const json = await response.json();
            if (json.success) {
                setJobs(json.data);
            } else {
                setJobs([])
            }
        }
        getJobs();
    }, [jobs])
    return (
        <div className='applicant-home-container'>
            {loading && <Loading />}
            <h1 className='applicant-heading'>Jobs Available</h1>
            {jobs.length !== 0 &&
                <div className='job-card-container'>
                    {jobs.map((job) => {
                        return <Job title={job.title} description={job.description} salary={job.salary} id={job._id} key={job._id} />
                    })}
                </div>
            }
            {jobs.length === 0 && <p className='job-salary'>No Jobs Posted.</p>}
            <i class="fa-solid fa-arrow-right-from-bracket logout" onClick={logout}></i>
        </div>
    )
}

export default ApplicantHome