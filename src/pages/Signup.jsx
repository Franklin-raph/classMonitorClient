import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../redux/studentSlice'

const useStyles = makeStyles((theme) => ({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 35,
        height: '820px',
        width: '500px',
        margin: '4rem auto',
        [theme.breakpoints.down('sm')] : {
            width: '300px',
            paddingBottom: 70,
            height: '820px'
        },
        [theme.breakpoints.down("lg")] : {
            marginTop: '5rem',
            marginBottom: '4rem'
        }
    },
    header : {
        textAlign: 'center',
        marginBottom: 40,
    },
    passwordStyle : {
        // margin: '25px',
    },
    
}))

const Signup = (props) => {

    

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [github, setGithub] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();
    const student = useSelector(state => state.student) 
    const dispatch = useDispatch();
    

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumError, setPhoneNumError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [githubError, setGithubError] = useState(false);
    const [error, setError] = useState('')
    const [passwordLengthError, setPasswordLengthError] = useState('')
    

    const handleRegister = async (e) => {
        e.preventDefault();

        dispatch(signUp({name,email,phoneNum,address,gender}))

        setNameError(false)
        setEmailError(false)
        setGithubError(false)
        setAddressError(false)
        setPhoneNumError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)

        

        if(name === '' || email === '' || password === '' || confirmPassword === '' || phoneNum === '' || address === '' || gender === '' || github === ''){
            if(name === ''){
                setNameError(true)
            }
    
            if(password === ''){
                setPasswordError(true)
            }
    
            if(confirmPassword === ''){
              setConfirmPasswordError(true)
            }
    
            if(email === ''){
              setEmailError(true)
            }
    
            if(phoneNum === ''){
              setPhoneNumError(true)
            }
    
            if(address === ''){
                setAddressError(true)
            }

            if(github === ''){
                setGithubError(true)
            }

            setError("Please fill in all fields")
            setTimeout(() => setError(""), 3000)
            

        } else if(password.length < 6){
            setPasswordLengthError("password is too short minimum of 6 characters is required")
            setTimeout(() => setPasswordLengthError(''), 3000)
        }else if(password !== confirmPassword){
            setPasswordError(true)
            setConfirmPassword(true)
            setError("Password fields do not match")
            setTimeout(() => setError(''), 3000)
        }else{
            try {
                console.log(gender)
                const resp = await fetch('http://localhost:5000/auth/student/register', {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({name, email, password, phoneNum, gender, address, github}),
                headers: {
                    "Content-type": "application/json"
                }
            })
                const data = await resp.json();

                if(resp.status === 400){
                    setError(data.msg)
                }else{
                    localStorage.setItem('studentDetails', JSON.stringify(data))
                    navigate(`/`)
                    window.location.reload(true)
                    console.log(data)
                    // setloggedInStudent(data)
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
          <form className={classes.center} onSubmit = { handleRegister }>
              <div className={classes.header}>
                  <p style={{color:'red', marginBottom:'15px'}}>{error}</p>
                  <AccountCircleIcon style={{ fontSize: 50 }}/>
                  <Typography variant="h6">Student Registeration Form</Typography>
              </div>
              <TextField 
                  id="standard-basic" 
                  label="Name" 
                  variant="standard"
                  error={nameError}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Email" 
                  variant="standard"
                  type="email"
                  error={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Phone Number" 
                  variant="standard"
                  type="Number"
                  error={phoneNumError}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Address" 
                  variant="standard"
                  error={addressError}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Github Profile" 
                  variant="standard"
                  error={githubError}
                  onChange={(e) => setGithub(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Password" 
                  variant="standard"
                  type="password"
                  error={passwordError}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />
              <small><i sx={{color:'red'}}>{passwordLengthError}</i></small>

              <TextField 
                  id="standard-basic" 
                  label="Confirm Password" 
                  variant="standard"
                  type="password"
                  error={confirmPasswordError}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  sx={{mb:4}}
              />

        <FormLabel sx={{textAlign:'left'}}>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{mb:3}}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel  value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>

              <Button
                  type="submit"
                  variant="contained" 
                  color="success"
                  onClick={() => handleRegister }
              >
                  Register
              </Button>
          </form>
      </Paper>
    </>
  )
}

export default Signup