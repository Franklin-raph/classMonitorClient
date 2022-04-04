import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

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
        width: '300px',
        margin: '5rem auto 0 auto',
        [theme.breakpoints.down('sm')] : {
            width: '300px',
            paddingBottom: 70,
            height: '400px'
        },
        [theme.breakpoints.down("lg")] : {
            marginTop: '5rem',
            marginBottom: '4rem'
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

const Signin = () => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [studentID, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin =  async (e) => {
        e.preventDefault();

        setEmailError(false)
        setPasswordError(false)

        if(studentID === '' || password === ''){
            if(studentID === ''){
                setEmailError(true)
            }
    
            if(password === ''){
                setPasswordError(true)
            }
            setError("Please fill in the required fileds")
        }else {
            try {
                const resp = await fetch('https://classroommonitorbackend.herokuapp.com/auth/student/login',{
                    method:"POST",
                    body: JSON.stringify({studentID, password}),
                    headers: {
                        "Content-type": "application/json"
                    },
                    mode: "cors"
                })
    
                const data = await resp.json()
                console.log(data)

                if(resp.status === 400){
                    setError(data.msg)
                    setTimeout(() => setError(""),3000)
                    navigate(`/signin`)
                }else{
                    localStorage.setItem('studentDetails', JSON.stringify(data))
                    navigate(`/`)
                    window.location.reload(true)
                }
    
            } catch (error) {
                console.log(error)
            }
        }
     }

    const classes = useStyles()
    
  return (
    <>
    <Paper elevation={10} className={classes.paperStyle}>
        <form className={classes.center} onSubmit = { handleLogin }>
            <div className={classes.header}>
                <p style={{color:'red', marginBottom:'15px'}}>{error}</p>
                <AccountCircleIcon style={{ fontSize: 50 }}/>
                <Typography variant="h6">Student Login</Typography>
            </div>
            <TextField 
                id="standard-basic" 
                label="Student-ID" 
                variant="standard"
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                
            />

            <TextField 
                id="standard-basic" 
                label="Password" 
                variant="standard"
                type="password"
                error={passwordError}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                className={classes.passwordStyle}
                sx={{mb:5}}
            />

            <Button
                type="submit"
                variant="contained" 
                color="success"
                onClick={() => handleLogin }
            >
                Login
            </Button>
        </form>
    </Paper>
        
        
    </>
  )
}

export default Signin