import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PageNotFound_404 = () => {
  const navigate = useNavigate();
  const studentDetails = useSelector(state => state.student)
  if(studentDetails.value === null){
    navigate(`/login`)
  }
  return (
    <div>PageNotFound_404</div>
  )
}

export default PageNotFound_404