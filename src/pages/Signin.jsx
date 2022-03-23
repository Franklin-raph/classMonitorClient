import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 20,
        height: '60vh',
        width: '260px',
        margin: '4rem auto'
    },
    header : {
        margin: '1.5rem 0',
        textAlign: 'center'
    },
    passwordStyle : {
        margin: '25px',
    },
    iconSize : {
        fontSize: '50px'
    }

})

const Signin = () => {

    const [studentID, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin =  async (e) => {
        e.preventDefault();

        setEmailError(false)
        setPasswordError(false)

        if(studentID === '' && password === ''){
            if(studentID === ''){
                setEmailError(true)
            }
    
            if(password === ''){
                setPasswordError(true)
            }
            setError("Please fill in the required fileds")
        }else {
            try {
                const resp = await fetch('http://localhost:5000/auth/student/login',{
                    method:"POST",
                    body: JSON.stringify({studentID, password}),
                    headers: {
                        "Content-type": "application/json"
                    },
                    mode: "cors"
                })
    
                const data = await resp.json()
                localStorage.setItem('jwt', JSON.stringify(data.token))
                if(resp.status === 400){
                    setError(data.msg)
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
                <p>{error}</p>
                <AccountCircleIcon className={classes.iconSize}/>
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