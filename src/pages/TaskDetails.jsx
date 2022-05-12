import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

const TaskDetails = () => {

    let { taskID } = useParams();
    const navigate = useNavigate();
    
    const [taskDetails, setTaskDetails] = useState([])
    const studentDetails = useSelector(state => state.student)
    

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
          hours: Math.floor(difference / (1000 * 60 * 60)),
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

  return (
    <Container>
      <h2 style={{ fontWeight: 'bold', textAlign:'center', marginTop:'1rem' }} >Task</h2>
      <p><span style={{fontWeight:'bold'}}>Task</span>:  {taskDetails.task} </p>
      <p><span style={{fontWeight:'bold'}}>Task Reference </span>:  {taskDetails.reference} </p>
      <p><span style={{fontWeight:'bold'}}>Task Details </span>: <span className='taskDetails'> {taskDetails.details} </span></p>
      <p><span style={{fontWeight:'bold'}}>Task Deadline </span>:  {taskDetails.submissionDate} </p>
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