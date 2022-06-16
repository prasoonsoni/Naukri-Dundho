import React, { useState } from 'react'
import Loading from '../../components/loading/Loading';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Job = (props) => {
    const [loading, setLoading] = useState(false)

    const deleteJob = async () => {
        setLoading(true)
        const response = await fetch(`${BASE_URL}/job/${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            }
        });
        const json = await response.json();
        setLoading(false);

    }
    return (
        <div className='job-card'>
            {loading && <Loading />}
            <h1 className='job-title'>{props.title}</h1>
            <p className='job-description'>{props.description}</p>
            <p className='job-salary'>Salary: {props.salary}</p>
            <i class="fa-solid fa-trash-can job-delete" onClick={deleteJob}></i>
        </div>
    )
}

export default Job