import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../../components/title/Title';
import Applicant from './Applicant';
import './companyhome.css'

const BASE_URL = process.env.REACT_APP_BASE_URL

const Applicants = () => {
    const { post_id } = useParams();
    const [applicants, setApplicants] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const showApplicants = async () => {
            const response = await fetch(`${BASE_URL}/job/applicants/${post_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json()
            if (json.success) {
                setApplicants(json.data)
            }
        }
        showApplicants()
    }, [applicants])
    return (
        <div className='applicants-container'>
            <i class="fa-solid fa-xmark close" onClick={()=>{navigate(-1)}}></i>
            <Title title='Applicants' />
            {applicants.map((applicant) => {
                return <Applicant name={applicant.name} description={applicant.description} email={applicant.email} />
            })}
        </div>
    )
}

export default Applicants