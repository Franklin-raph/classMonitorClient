import { Button, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import { Paper } from '@mui/material'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: '-70px',
      padding: '80px 30px 30px 30px',
      textAlign: 'center',
      backgroundColor:'rgb(0, 33, 65) !important',
      color: '#fff !important'
    },
    nameandemail : {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      textAlign: 'center',
      [theme.breakpoints.down("sm")]:{
        flexDirection:'column'
      }
    },
    numberandgender: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      textAlign: 'center',
      marginRight: '11rem',
      [theme.breakpoints.down("sm")]:{
        flexDirection:'column',
        width: '100%',
      }
    },
    studentID :{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      textAlign: 'center',
      marginRight: '17.5rem',
      [theme.breakpoints.down("sm")]:{
        flexDirection:'column',
        width: '100%',
        // marginRight: '20rem'
      }
    }, 
    avatarBox : {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:'2rem',
      
    },
    avatar : {
      padding: '6rem',
      border:'10px solid #fff',
    },
    containerStyle : {
      [theme.breakpoints.down("lg")] : {
          marginTop: '1rem',
          marginBottom: '4rem'
      }
  }
  }))

const StudentDetails = () => {

    const classes = useStyles()

    const { id } = useParams()
    const [studentDetails, setStudentDetails] = useState([]);
    const [emailInitials, setEmailInitials] = useState('');
    
    useEffect( async () => {
        try{
            const resp = await axios.get(`https://classmonitorapp.herokuapp.com/student/${id}`)
            const data = await resp.data
            setStudentDetails(data)
            console.log(data)
            setEmailInitials(data.email.charAt(0))
        } catch (error){
            console.log(error)
        }
    },[])

    
    

  return (
  <Container className={classes.containerStyle}>
    <div className={classes.avatarBox}>
      <Avatar sx={{ backgroundColor:'#808080', fontSize:'5rem'}} className={classes.avatar}><img width={150} height={150} src={studentDetails.avatar} /></Avatar>
    </div>
    <Paper elevation={3} className={classes.paper}>
      
      <div className={classes.nameandemail}>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Name : </span>{studentDetails.name}</p>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Email : </span>{studentDetails.email}</p>
      </div>
      
      <div className={classes.numberandgender}>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Phone Number : </span>{studentDetails.phoneNum}</p>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Gender : </span> {studentDetails.gender}</p>
      </div>
      
      <div className={classes.studentID}>
      <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student ID : </span>{studentDetails.studentID}</p>
      <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Address : </span>{studentDetails.address}</p>
        
      </div>
    </Paper>
  </Container>
  )
}

export default StudentDetails