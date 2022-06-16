import React, { useState, useEffect } from 'react'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'
import Loading from '../../components/loading/Loading';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BASE_URL = process.env.REACT_APP_BASE_URL

const Applicant = () => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [snackbarStatus, setSnackbarStatus] = useState({ severity: "", open: false, message: "" })
    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            setTimeout(() => {
                navigate("/applicant/home");
            }, 500);
        }

    }, [])

    const forLogin = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    const forRegister = () => {
        setShowLogin(true)
        setShowRegister(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarStatus({ severity: "", open: false, message: "" })
    };

    const onRegisterClick = async (name, email, password, description) => {
        if (name === "" || email === "" || password === "" || description === "") {
            setSnackbarStatus({ open: true, message: "Fields cannot be empty.", severity: "error" })
            return
        }
        setLoading(true)
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
                "description": description,
                "password": password,
                "type": "applicant"
            }),
        });
        const json = await response.json();
        setLoading(false)
        if (!json.success) {
            setSnackbarStatus({ open: true, message: json.message, severity: "error" })
            return
        }
        setSnackbarStatus({ open: true, message: json.message, severity: "success" })
        forRegister()
    }

    const onLoginClick = async (email, password) => {
        if (email === "" || password === "") {
            setSnackbarStatus({ open: true, message: "Fields cannot be empty.", severity: "error" })
            return
        }
        setLoading(true)
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "type": "applicant"
            }),
        });
        const json = await response.json();
        setLoading(false)
        if (!json.success) {
            setSnackbarStatus({ open: true, message: json.message, severity: "error" })
            return
        }
        setSnackbarStatus({ open: true, message: "Successfully logged in.", severity: "success" })
        sessionStorage.setItem("auth-token", json.token)
        navigate('/applicant/home', { replace: true })
    }

    return (
        <>
            <Logo />
            <Snackbar open={snackbarStatus.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={snackbarStatus.severity} sx={{ width: '100%' }}>
                    {snackbarStatus.message}
                </Alert>
            </Snackbar>
            {loading && <Loading />}
            {showLogin && <Login heading='LOGIN' for='Applicant' onEndClick={forLogin} onLoginClick={onLoginClick} />}
            {showRegister && <Register heading='REGISTER' for='Applicant' onEndClick={forRegister} onRegisterClick={onRegisterClick} />}

        </>
    )
}

export default Applicant