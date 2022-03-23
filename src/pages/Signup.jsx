import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const useStyles = makeStyles({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 50,
        height: '90vh',
        width: '300px',
        margin: '4rem auto'
    },
    header : {
        margin: '1.5rem 0',
        textAlign: 'center'
    },
    passwordStyle : {
        // margin: '25px',
    },
    iconSize : {
        fontSize: '50px'
    }

})

const Signup = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumError, setPhoneNumError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    

    const handleRegister = async (e) => {
        e.preventDefault();

        setEmailError(false)
        setPasswordError(false)
        setNameError(false)
        setPhoneNumError(false)
        setAddressError(false)
        setGender(false)
        setConfirmPasswordError(false)

        if(name === '' && email === '' && password === '' && confirmPassword === '' && phoneNum === '' && address === '' && gender === ''){
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
    
            if(gender === ''){
                setGender(true)
            }
        }else if(password !== confirmPassword){
            setPasswordError(true)
            setConfirmPassword(true)
            setError("Password fields do not match")
        }else{
            try {
                const resp = await fetch('http://localhost:5000/auth/student/register', {
                method: "POST",
                mode: "cors",
                body: JSON.stringify({name, email, password, phoneNum, gender, address}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await resp.json();
            console.log(data)
            localStorage.setItem('jwt', JSON.stringify(data.token))
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
                  <AccountCircleIcon className={classes.iconSize}/>
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
                  error={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Phone Number" 
                  variant="standard"
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
                  label="Password" 
                  variant="standard"
                  error={passwordError}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Confirm Password" 
                  variant="standard"
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