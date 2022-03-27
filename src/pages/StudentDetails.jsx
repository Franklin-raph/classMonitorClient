import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StudentDetails = () => {

    const { id } = useParams()
    const [studentDetails, setStudentDetails] = useState([]);
    
    useEffect( async () => {
        try{
            const resp = await axios.get(`http://localhost:5000/student/${id}`)
            const data = await resp.data
            setStudentDetails(data)
            console.log(data)
            console.log(studentDetails)
        } catch (error){
            console.log(error)
        }
    },[])

    console.log(studentDetails)

  return (
    <div>
        <p>{studentDetails.name}</p>
        <p>{studentDetails.email}</p>
        <p>{studentDetails.phoneNum}</p>
        <p>{studentDetails.studentID}</p>
        <p>{studentDetails.gender}</p>
    </div>
  )
}

export default StudentDetails