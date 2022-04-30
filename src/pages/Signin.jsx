import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel'

const useStyles = makeStyles((theme) => ({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 20,
        height: '57vh',
        width: '330px',
        margin: '5rem auto 0 auto',
        [theme.breakpoints.down('sm')] : {
            width: '300px',
            paddingBottom: 70,
            height: '440px',
        },
        [theme.breakpoints.down("lg")] : {
            marginTop: '9rem',
            marginBottom: '4rem',
        }
    },
    header : {
        margin: '1.2rem 0',
        textAlign: 'center'
    },
    passwordStyle : {
        margin: '25px',
    }
}))

const Signin = () => {

    const classes = useStyles()
    const location = useLocation();
    const navigate = useNavigate();
    
    const [studentID, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)
    
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

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
            setLoading(false)
            setTimeout(() => setError(""), 3000)
            
        }else {
            setLoading(true)

            try {
                const resp = await fetch('https://classmonitorapp.herokuapp.com/auth/student/login',{
                    method:"POST",
                    body: JSON.stringify({studentID, password}),
                    headers: {
                        "Content-type": "application/json"
                    },
                })
                const data = await resp.json()
                if(!data){
                    setLoading(true)
                }else{
                    setLoading(false)
                }
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

     const showPasswordHandle = () => {
        if(passwordType === "password"){
        setPasswordType("text")
        return;
        }
        else if(passwordType === "text"){
            setPasswordType("password")
        }
      
    }
     
  return (
    <>
    <Paper elevation={10} className={classes.paperStyle}>
        <form className={classes.center} onSubmit = { handleLogin }>
            <div className={classes.header}>
                <p style={{color:'red', marginBottom:'7px'}}>{error}</p>
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
                sx={{mb:2}}
                
            />

            <TextField 
                id="standard-basic"
                label="Password" 
                variant="standard"
                type={passwordType}
                error={passwordError}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                className={classes.passwordStyle}
                
            />
            <div className={classes.showPasswordStyle}>
                <FormControlLabel control={<Checkbox />} label="Show Password" sx={{mb:3, mr:12}} onChange={showPasswordHandle}/>
                {/* <h6 style={{marginRight: '5px'}}></h6> */}
            </div>

            <Button
                type="submit"
                variant="contained" 
                color="success"
                onClick={() => handleLogin }
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
                Login
            </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '7px' }}>
            <Link to={`/forgotpassword`}>Forgot Password?</Link>
        </p>
        
    </Paper>
        
        
    </>
  )
}

export default Signin