import React, { useState } from 'react'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import Loading from '../../components/loading/Loading'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BASE_URL = process.env.REACT_APP_BASE_URL

const PostJob = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [salary, setSalary] = useState("")
    const [loading, setLoading] = useState(false)
    const [snackbarStatus, setSnackbarStatus] = useState({ severity: "", open: false, message: "" })

    const onPostHandle = async (title, description, salary) => {
        if (title === "" || description === "" || salary === "") {
            setSnackbarStatus({ open: true, message: "Fields cannot be empty.", severity: "error" })
            return
        }
        setLoading(true)
        const response = await fetch(`${BASE_URL}/job`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            },
            body: JSON.stringify({ title, description, salary }),
        });
        const json = await response.json();
        setLoading(false);
        if (json.success) {
            setSnackbarStatus({ open: true, severity: "success", message: json.message })
        } else {
            setSnackbarStatus({ open: true, severity: "danger", message: json.message })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarStatus({ severity: "", open: false, message: "" })
    };
    return (
        <div className='post-job-container'>
            {loading && <Loading />}
            <Snackbar open={snackbarStatus.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={snackbarStatus.severity} sx={{ width: '100%' }}>
                    {snackbarStatus.message}
                </Alert>
            </Snackbar>
            <Input placeholder='Enter Job Title' type='text' setValue={setTitle} />
            <Input placeholder='Enter Job Description' type='text' setValue={setDescription} />
            <Input placeholder='Enter Salary' type='text' setValue={setSalary} />
            <Button text='Post' onClick={async () => { onPostHandle(title, description, salary) }} />
        </div>
    )
}

export default PostJob