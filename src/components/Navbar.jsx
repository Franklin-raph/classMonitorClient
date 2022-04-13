import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles'
import axios from "axios";


const useStyles = makeStyles({
  divider: {
    color: '#fff',
    backgroundColor: '#fff'
  }
})

function Navbar() {

  const classes = useStyles();

    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState("")
    const [isOpen, setIsOpen] = useState(false);

    const storageItem = localStorage.getItem('studentDetails')

    const studentDetails = useSelector(state => state.student)

  const handleLogout = () =>{
  //   axios.get('/auth/signout')
  //   localStorage.removeItem('jwt')
  //   historyRoute(`/`)
  //   window.location.reload()
  //   console.log("User is signed out")

        fetch('https://classroommonitorbackend.herokuapp.com/auth/student/logout')
        navigate(`/`)
        window.location.reload()

        localStorage.removeItem('studentDetails')

        window.location.reload(true)
  }

  useEffect(() => {
    if(storageItem) setStudentName(studentDetails.value.signedInStudent.name)
    else setStudentName("")
  },[])

  console.log(studentName)

  // 056576

  return (
    <>
        <nav className="navbar">
            <a href="#">
                <h4>Class Monitor</h4>
            </a>
            <div className={`nav-items ${isOpen && "open"}`}>
            { storageItem ?
            <>
            <Link to="/allstudents" onClick={() => setIsOpen(!isOpen)}>
              View Students
            </Link>
            <Link to="/dashboard" onClick={() => setIsOpen(!isOpen)}>
              Dashboard
            </Link>
            <Link to="/" onClick={ handleLogout }>
              Sign Out
            </Link>
            <span style={{padding:'3px 0.06px', backgroundColor:'#fff', marginRight:'16px'}} className="verticalLine"></span>
            <>
              Welcome, { studentName ? <span>{studentName}</span> : null}
            </>
              
            </>
            :
            <>
            <Link to="/signin" onClick={() => setIsOpen(!isOpen)} >
              Login
            </Link>
              <Link to="/signup" onClick={() => setIsOpen(!isOpen)} >
              Register
            </Link>
            </>
            }

            </div>
            <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
            </div>
        </nav>
    </>
  );
}

export default Navbar;