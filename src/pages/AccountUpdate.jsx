import React, { useEffect, useState } from 'react'
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
import { updateAccount } from '../redux/studentSlice'

const useStyles = makeStyles((theme) => ({
    center : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paperStyle : {
        padding: 35,
        height: '750px',
        width: '500px',
        margin: '4rem auto',
        [theme.breakpoints.down('sm')] : {
            width: '300px',
            paddingBottom: 70,
            height: '800px',
            marginTop: '4rem'
        }
    },
    header : {
        textAlign: 'center',
        marginBottom: 40,
    },
}))

const AccountUpdate = () => {

    const studentDetails = useSelector(state => state.student)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [github, setGithub] = useState("");
    const [id, setId] = useState();
    const [state, setState] = useState({});

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    
    const [emailError, setEmailError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneNumError, setPhoneNumError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [githubError, setGithubError] = useState(false);
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)
    
    useEffect(() => {

        setFirstName(studentDetails.value.signedInStudent.firstName)
        setLastName(studentDetails.value.signedInStudent.lastName)
        setEmail(studentDetails.value.signedInStudent.email)
        setGender(studentDetails.value.signedInStudent.gender)
        setGithub(studentDetails.value.signedInStudent.github)
        setAddress(studentDetails.value.signedInStudent.address)
        setPhoneNum(studentDetails.value.signedInStudent.phoneNum)
        setId(studentDetails.value.signedInStudent.studentID)

        // Used this line code down here to solve this error ===>  React useEffect causing: Can't perform a React state update on an unmounted component...
        return () => {
            setState({})
        }
    
    },[])

    // name,email,gender,github,address,phoneNum,id
    console.log(id)

    const studentID = id

    const handleUpdate = async (e) => {
        e.preventDefault();

        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setGithubError(false)
        setAddressError(false)
        setPhoneNumError(false)

        if(firstName === '' || lastName === '' || email === '' || phoneNum === '' || address === '' || gender === '' || github === ''){
            if(firstName === ''){
                setFirstNameError(true)
            }

            if(lastName === ''){
                setLastNameError(true)
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
            setTimeout(() => setError(""),3000)

        } else{
            // https://classmonitorapp.herokuapp.com
            setLoading(true)
            try {
                dispatch(updateAccount({firstName, lastName, email,phoneNum,address,gender,github,studentID}))
                const resp = await fetch(`https://classmonitorapp.herokuapp.com/student/${id}`, {
                method: "PATCH",
                mode: "cors",
                body: JSON.stringify({firstName, lastName, email, phoneNum, gender, address, github}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            // http://localhost:3000/dashboard
                const data = await resp.json();
                if(!data){
                    setLoading(true)
                }else{
                    setLoading(false)
                }

                if(resp.status === 400){
                    setError(data.msg)
                    setTimeout(() => setError(""), 2000)
                    setTimeout(() => window.location.reload(true), 2100)
                    
                }else{
                    localStorage.setItem('studentDetails', JSON.stringify(data))
                    navigate(`/`)
                    // I reloaded here so the navbar component can update it's state and use the current name of the loggedIn student
                    window.location.reload(true)
                    console.log(data)
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
          <form className={classes.center} onSubmit = { handleUpdate }>
              <div className={classes.header}>
                  <p style={{color:'red', marginBottom:'15px'}}>{error}</p>
                  <AccountCircleIcon style={{ fontSize: 50 }}/>
                  <Typography variant="h6">Student Account Update Form</Typography>
              </div>
              <TextField 
                  id="standard-basic" 
                  label="Name"
                  value={firstName}
                  variant="standard"
                  error={firstNameError}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Name"
                  value={lastName}
                  variant="standard"
                  error={lastNameError}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Email"
                  value={email}
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
                  value={phoneNum}
                  error={phoneNumError}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Address" 
                  variant="standard"
                  value={address}
                  error={addressError}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

              <TextField 
                  id="standard-basic" 
                  label="Github Profile"
                  value={github}
                  variant="standard"
                  error={githubError}
                  onChange={(e) => setGithub(e.target.value)}
                  fullWidth
                  sx={{mb:2}}
              />

        <FormLabel sx={{textAlign:'left'}}>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
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
                  onClick={() => handleUpdate }
                  disabled={loading}
              >
                  {loading && (
                    <span 
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                        />
                )}
                  Update
              </Button>
          </form>
      </Paper>
    </>
  )
}

export default AccountUpdate