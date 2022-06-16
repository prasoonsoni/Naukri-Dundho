import React, { useEffect, useState } from 'react'
import Job from './Job'
const BASE_URL = process.env.REACT_APP_BASE_URL

const PostedJobs = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const getJobs = async () => {
            const response = await fetch(`${BASE_URL}/job`, {
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
        <div className='posted-job-container'>
            {jobs.length !== 0 &&
                <div className='job-card-container'>
                    {jobs.map((job) => {
                        return <Job title={job.title} description={job.description} salary={job.salary} id={job._id} key={job._id} applicants={job.applicants} />
                    })}
                </div>
            }
            {jobs.length === 0 && <p className='job-salary'>No Jobs Posted.</p>}

        </div>
    )
}

export default PostedJobs