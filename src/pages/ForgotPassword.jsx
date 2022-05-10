import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 20,
        height: '55vh',
        width: '330px',
        margin: '3rem auto 0',
        [theme.breakpoints.down('sm')] : {
            width: '300px',
            paddingBottom: 70,
            height: '420px',
        },
        [theme.breakpoints.down("lg")] : {
            marginTop: '3rem',
            marginBottom: '4rem',
        }
    },
    header : {
        margin: '1.5rem 0',
        textAlign: 'center'
    },
    passwordStyle : {
        margin: '25px',
    }
}))

const ForgotPassword = () => {

    const classes = useStyles()
    const location = useLocation();
    const navigate = useNavigate();
    const studentDetails = useSelector(state => state.student)
    // if(studentDetails.value === null){
    //     navigate(`/login`)
    //   }

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false)
    
    const handleResetPasswordLink =  async (e) => {
        e.preventDefault();

        setEmailError(false)

        if(email === ''){
            setError("Please fill in the required filed")
            setLoading(false)
            setTimeout(() => setError(""), 3000)
            setEmailError(true)
            
        }else {
            setLoading(true)

            setTimeout(() => {
                setLoading(false)
            },5000)
            try {
                const resp = await fetch('https://classmonitorapp.herokuapp.com/student/forgotpassword',{
                    method:"POST",
                    body: JSON.stringify({email}),
                    headers: {
                        "Content-type": "application/json"
                    },
                    mode: "cors"
                })

                const data = await resp.json()
                if(resp.status === 404){
                    setError(data.msg)
                    setTimeout(() => setError(''), 5000)
                } else{
                    setMsg(`Password reset link has been sent to ${email}`)
                    setTimeout(() => setMsg(''), 5000)
                    setTimeout(() => window.location.reload(true), 5100)
                }
            } catch (error) {
                console.log(error)
            }
        }
     }
    
  return (
    <>
    <Paper elevation={10} className={classes.paperStyle}>
        <form className={classes.center} onSubmit = { handleResetPasswordLink }>
            <div className={classes.header}>
                <p style={{color:'red', marginBottom:'15px', fontSize:'14px'}}>{error}</p>
                <p style={{color:'green', marginBottom:'15px', fontSize:'14px'}}>{msg}</p>
                <AccountCircleIcon style={{ fontSize: 50 }}/>
                <Typography variant="h6">Student Reset Password Request</Typography>
            </div>
            <TextField 
                id="standard-basic" 
                label="Email" 
                variant="standard"
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{mb:4}}
            />

            <Button
                type="submit"
                variant="contained" 
                color="success"
                onClick={() => handleResetPasswordLink }
                sx={{outline:'none'}}
                disabled={loading}
            >
                {loading && (
                    <span 
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                        />
                )}
                Reset Password Link
            </Button>
        </form>
    </Paper>
        
        
    </>
  )
}

export default ForgotPassword