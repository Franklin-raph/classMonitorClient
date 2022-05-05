import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const TaskDetails = () => {

    let { taskID } = useParams();
    
    const [taskDetails, setTaskDetails] = useState([])

    const fetchTaskDetails = async () => {
        const task = await fetch(`https://classmonitorapp.herokuapp.com/assessment/getAnAssessment/${taskID}`)
        const data = await task.json();
        console.log(data)
        setTaskDetails(data)
        console.log(taskDetails)
    }

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
    </Container>
  )
}

export default TaskDetails