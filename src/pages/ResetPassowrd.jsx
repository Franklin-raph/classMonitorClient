import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
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
        height: '50vh',
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

const ResetPassowrd = () => {

    const classes = useStyles()
    const navigate = useNavigate()

    const { student_id, token } = useParams()
    const [studentDetails, setStudentDetails] = useState({})

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [github, setGithub] = useState('');
    const [avatar, setAvatar] = useState('');
    const [cloudinary_id, setCloudinary_id] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState()
    const [passwordLengthError, setPasswordLengthError] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect( async () =>{
        try {
            const resp = await fetch(`https://classmonitorapp.herokuapp.com/student/resetpassword/${student_id}/${token}`)
            const data = await resp.json()
            console.log(data)
            setStudentDetails(data)
            setFirstName(data.student.firstName)
            setLastName(data.student.lastName)
            setAddress(data.student.address)
            setAvatar(data.student.avatar)
            setCloudinary_id(data.student.cloudinary_id)
            setEmail(data.student.email)
            setGender(data.student.gender)
            setGithub(data.student.github)
            setPhoneNum(data.student.phoneNum)
            setStudentID(data.student.studentID)
        } catch (error) {
            console.log(error.message)
        }
    },[])

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        setPasswordError(false)
        setConfirmPasswordError(false)

        if(password === '' || confirmPassword === ''){
    
            if(password === ''){
                setPasswordError(true)
            }
    
            if(confirmPassword === ''){
              setConfirmPasswordError(true)
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
            setLoading(true)

            // setTimeout(() => {
            //     setLoading(false)
            // },7000)

            // dispatch(signUp({name,email,phoneNum,address,gender}))
            try {
                const resp = await fetch(`https://classmonitorapp.herokuapp.com/student/resetpassword/${student_id}/${token}`, {
                method: "PUT",
                mode: "cors",
                body: JSON.stringify({firstName, lastName, email, password, phoneNum, gender, address, github, avatar, cloudinary_id, studentID}),
                headers: {
                    "Content-type": "application/json"
                }
            })
                const data = await resp.json();

                if(!data){
                    setLoading(true)
                }else{
                    setLoading(false)
                }

                if(resp.status === 400){
                    setError(data.msg)
                }else{
                    setError("Password has been set successfullyiii")
                    navigate(`/signin`)
                    setError("Password has been set successfully")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    // console.log(studentDetails)
    // console.log(name)
    
  return (
    <div style={{ marginTop:'7rem'}}>
        <Paper elevation={10} className={classes.paperStyle}>
        <form className={classes.center} onSubmit = { handlePasswordReset }>
            <div className={classes.header}>
                <p style={{color:'red', marginBottom:'15px'}}>{error}</p>
                {/* <p style={{color:'green', marginBottom:'15px'}}>{msg}</p> */}
                <AccountCircleIcon style={{ fontSize: 50 }}/>
                <Typography variant="h6">Student Reset Password Request</Typography>
            </div>
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

            <Button
                type="submit"
                variant="contained" 
                color="success"
                onClick={() => handlePasswordReset }
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
                Reset Password
            </Button>
        </form>
    </Paper>
    </div>
  )
}

export default ResetPassowrd