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
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const classes = useStyles();

    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState("")

    const storageItem = localStorage.getItem('studentDetails')

    const studentDetails = useSelector(state => state.student)

  // const 

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const handleLogout = () =>{
  //   axios.get('/auth/signout')
  //   localStorage.removeItem('jwt')
  //   historyRoute(`/`)
  //   window.location.reload()
  //   console.log("User is signed out")

        fetch('http://localhost:5000/auth/student/logout')
        navigate(`/`)

        localStorage.removeItem('studentDetails')

        window.location.reload(true)
  }

  useEffect(() => {
    if(storageItem) setStudentName(studentDetails.value.signedInStudent.name)
    else setStudentName("")
  },[])

  console.log(studentName)

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav__brand">
          Class Monitor
        </Link>
        <ul className={ active }>
          { storageItem ?
          <>
          <li className="nav__item">
            <Link to="/allstudents" id="nav__link">
              View Students
            </Link>
          </li>
          <li className="nav__item">
          <Link to="/dashboard" id="nav__link">
            Dashboard
          </Link>
          </li>
            <li className="nav__item">
            <Link to="/" onClick={ handleLogout } id="nav__link">
              Sign Out
            </Link>
          </li>
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff', marginBottom:'7px'}}/>
          <li className="nav__item" style={{color:'#fff'}}>
            { studentName ? <h4> Welcome, {studentName} </h4> : null}
          </li>
        </>
          :
          <>
          <li className="nav__item">
            <Link to="/signin" onClick={ navToggle } className="nav__link">
              Sign In
            </Link>
            </li>
            <li className="nav__item">
              <Link to="/signup" onClick={ navToggle } className="nav__link">
              Register
            </Link>
          </li>
          
          
          </>
          }
        </ul>
        <div onClick={ navToggle } className={ icon }>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;