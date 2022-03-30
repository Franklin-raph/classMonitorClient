import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

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
    border:'10px solid #fff'
  },
  submit : {
    display: 'flex',
    alignItems:'center',
    marginTop:'30px'
  },
  containerStyle : {
    [theme.breakpoints.down("lg")] : {
        marginTop: '4rem',
        marginBottom: '4rem'
    }
}
}))

const Dashboard = () => {

  const studentDetails = useSelector(state => state.student)

  const location = useLocation()

  const classes = useStyles()
  const navigate = useNavigate();
  const [solution, setSolution] = useState("");
  const [solutionError, setSolutionError] = useState(false);
  const [assignmentErrorText, setAssignmentErrorText] = useState("");
  const [allStudentAssessments, setallStudentAssessments] = useState([]);

  const studentID = studentDetails.value.signedInStudent.studentID

  useEffect( async () => {

    try {
      const resp = await fetch('http://localhost:5000/assessment/getAssessment')
      const allAssessment = await resp.json()
      
        setallStudentAssessments(allAssessment)
      
    } catch (error) {
      console.log(error)
    }

    
  },[])

  allStudentAssessments.map((assessment) => {
    console.log(assessment)
  })

  console.log(allStudentAssessments)

  // Method to handle assignment Submission
  const handleAssessmentSubmit = async (e) => {
    e.preventDefault()

    if(solution === ''){
      setSolutionError(true)
      setAssignmentErrorText("Paste the link to your assignment above in the input field")
      setTimeout(() => setAssignmentErrorText(""), 2000)
    }else{
      
        setSolutionError(false)
        try {
          const resp = await fetch('http://localhost:5000/assessment/solution', {
          method: 'POST',
          body: JSON.stringify({studentID, solution}),
          headers: {
                "Content-type": "application/json"
          },
          mode: "cors"
        })
    
        const data = await resp.json();
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }  
    }



  return (
    <Container className={classes.containerStyle}>
      <div className={classes.avatarBox}>
        <Avatar sx={{ backgroundColor:'#808080', fontSize:'5rem'}} className={classes.avatar}>{studentDetails.value.signedInStudent.email.charAt(0)}</Avatar>
      </div>
      <Paper elevation={3} className={classes.paper}>
        
        <div className={classes.nameandemail}>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Name : </span>{studentDetails.value.signedInStudent.name}</p>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Email : </span>{studentDetails.value.signedInStudent.email}</p>
        </div>
        
        <div className={classes.numberandgender}>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Phone Number : </span>{studentDetails.value.signedInStudent.phoneNum}</p>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Gender : </span> {studentDetails.value.signedInStudent.gender}</p>
        </div>
        
        <div className={classes.studentID}>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student ID : </span>{studentDetails.value.signedInStudent.studentID}</p>
        <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Address : </span>{studentDetails.value.signedInStudent.address}</p>
          
        </div>
      </Paper>

        <Button
                  variant="contained" 
                  color="success"
                  onClick= {() => navigate(`/update`) }
                  sx={{marginTop:'10px'}}
              >
                  Update Account
        </Button>

          <form onSubmit={ handleAssessmentSubmit } className={classes.submit}>
            <TextField 
                      id="standard-basic" 
                      label="Paste link to assignment here" 
                      variant="standard"
                      onChange={(e) => setSolution(e.target.value)}
                      fullWidth
                      sx={{mb:2, width:'70%', mr:5}}
                      error={solutionError}
                  />
            <Button
                      type="submit"
                      variant="contained" 
                      color="success"
                      onClick= {() => handleAssessmentSubmit }
                      sx={{marginTop:'10px', padding:'-20px 40px'}}
                  >
                      Submit
            </Button>
          </form>
          <small style={{ color: 'red'}}><i>{assignmentErrorText}</i></small>

          {
            allStudentAssessments.map((assessment) => (
              <p>Task : {assessment.task}</p>
            ))
          }

    </Container>
  )
}

export default Dashboard