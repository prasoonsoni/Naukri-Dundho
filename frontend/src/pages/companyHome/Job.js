import React, { useState } from 'react'
import Loading from '../../components/loading/Loading';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Title from '../../components/title/Title'
import { Backdrop } from '@mui/material';
import Applicant from './Applicant';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Job = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const applicantNumber = props.applicants
    const [snackbarStatus, setSnackbarStatus] = useState({ severity: "", open: false, message: "" })
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarStatus({ severity: "", open: false, message: "" })
    };

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
        if (json.success) {
            setSnackbarStatus({ open: true, message: json.message, severity: "success" })
        } else {
            setSnackbarStatus({ open: true, message: json.message, severity: "warning" })
        }
        setLoading(false);

    }
    return (
        <div className='job-card'>
            {loading && <Loading />}
            <h1 className='job-title'>{props.title}</h1>
            <p className='job-description'>{props.description}</p>
            <p className='job-applicants' onClick={()=>{navigate(`/job/applicants/${props.id}`)}} >{applicantNumber.length} Applicants</p>
            <p className='job-salary' >Salary: {props.salary}</p>
            <i class="fa-solid fa-trash-can job-delete" onClick={deleteJob}></i>
        </div>
    )
}

export default Job