import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({

  submit : {
    display: 'flex',
    alignItems:'center',
    marginTop:'30px'
  },
  
}))

const TaskDetails = () => {

    let { taskID } = useParams();
    const navigate = useNavigate();

    const classes = useStyles()
    
    const [taskDetails, setTaskDetails] = useState([])
    const studentDetails = useSelector(state => state.student)
    const [solution, setSolution] = useState("");
    const [solutionError, setSolutionError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [assignmentErrorText, setAssignmentErrorText] = useState("");
    const [assignmentSuccessText, setassignmentSuccessText] = useState("");

    const studentID = studentDetails.value.signedInStudent.studentID
    

    if(studentDetails.value === null){
      navigate(`/login`)
    }

    const fetchTaskDetails = async () => {
        const task = await fetch(`https://classmonitorapp.herokuapp.com/assessment/getAnAssessment/${taskID}`)
        const data = await task.json();
        console.log(data)
        setTaskDetails(data)
        console.log(taskDetails)
    }

    const calculateTimeLeft = () => {
      const ded = "2022-05-13T18:30:00+05:30"
      const difference = +new Date(taskDetails.submissionCountdown) - +new Date();

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;  

    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    

    console.log("Before timeleft")
    console.log(timeLeft)
    console.log("After timeleft")
    setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    useEffect(() => {
        fetchTaskDetails();
        
    },[])

      // Method to handle assignment Submission
  const handleAssessmentSubmit = async (e) => {
    e.preventDefault()

    if(solution === ''){
      setSolutionError(true)
      setAssignmentErrorText("Paste the link to your assignment above in the input field")
      setTimeout(() => setSolutionError(false), 2000)
      setTimeout(() => setAssignmentErrorText(""), 2000)
    }else{
      
        setSolutionError(false)
        try {
          setLoading(true)
          const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/solution', {
          method: 'POST',
          body: JSON.stringify({studentID, solution}),
          headers: {
                "Content-type": "application/json"
          },
          mode: "cors"
        })
    
        const data = await resp.json();
          if(!data) setLoading(true)

          setLoading(false)
            
          setTimeout(() => setSolution(""), 2000)
          setassignmentSuccessText("Assignment Submitted Successfully")
          setTimeout(() => setassignmentSuccessText(""), 2000)
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }  
    }

  return (
    <Container>
      <h2 style={{ fontWeight: 'bold', textAlign:'center', marginTop:'1rem' }} >Task</h2>
      <p><span style={{fontWeight:'bold'}}>Task</span>:  {taskDetails.task} </p>
      <p><span style={{fontWeight:'bold'}}>Task Reference </span>:  {taskDetails.reference} </p>
      <p><span style={{fontWeight:'bold'}}>Task Details </span>: <span className='taskDetails'> {taskDetails.details} </span></p>
      <p><span style={{fontWeight:'bold'}}>Task Deadline </span>:  {taskDetails.submissionDate} </p>
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
                      disabled={loading}
                  >
                    {loading && (
                    <span 
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                        />
                )}
                      Submit
            </Button>

          </form>
          
          <small><i style={{ color: 'red'}}>{assignmentErrorText}</i></small>
          <small><i style={{ color: 'green'}}>{assignmentSuccessText}</i></small>

      {timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
      <p className='timeCountDown'>
        <span>{timeLeft.days}d </span>
        <span>: </span>
        <span>{timeLeft.hours}h </span>
        <span>: </span>
        <span>{timeLeft.minutes}m </span>
        <span>: </span>
        <span>{timeLeft.seconds}s</span>
      </p>
      ) : (
        <p>Time is up 🔥</p>
      )
    }
    </Container>
  )
}

export default TaskDetails