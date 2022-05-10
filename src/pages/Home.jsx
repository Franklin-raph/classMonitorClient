import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';

import Image from '../images/bg.jpg';
import { Button } from '@mui/material';
import { useNavigate, Redirect } from 'react-router-dom';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

const useStyles = makeStyles(theme => ({
  homeSection: {
    background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${Image})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflowY:'hidden',
    // marginTop:'2rem',
  },
  homeSectionText : {
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop:'2rem',
  },
  h1: {
    fontWeight: 700,
    fontSize:'5rem',
    [theme.breakpoints.down('sm')] : {
      fontSize: '30px',
    },
    [theme.breakpoints.between('sm','md')] : {
      fontSize: '3rem',
    },
    [theme.breakpoints.between('md','lg')] : {
      fontSize: '4rem',
    }
  },
  p: {
    fontWeight: 300,
    fontSize:'1.5rem',
    padding: '0 10px',
    [theme.breakpoints.down('sm')] : {
      fontSize: '18px',
    }
  },
  homeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')] : {
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
    }
  },
  loginButton: {
    backgroundColor: 'rgba(0, 33, 65, 0.9)',
    padding: '8px 45px',
    color:'#fff',
    outline: 'none',
    border:'none',
    [theme.breakpoints.down('sm')] : {
      marginRight: '20px',
      marginTop:'20px'
    },
    // hover:{
    //   border:'2px solid red'
    // }
  },
  registerButton: {
    backgroundColor: 'transparent',
    padding: '7px 40px',
    color:'#fff',
    outline: 'none',
    border:'2px solid #fff',
    [theme.breakpoints.down('sm')] : {
      marginLeft: '20px',
      marginTop:'20px',
    }
  }
}))

const Home = () => {

  const classes = useStyles();
  const navigate = useNavigate();
  const studentDetails = useSelector(state => state.student)

  if(studentDetails.value === null){
    navigate(`/login`)
  }

  console.log(studentDetails)

  if(studentDetails.value === null) console.log("No std details")
  else console.log("std in")
  
  return (
    <div style={{ marginTop: '0em'}}>
      <div className={classes.homeSection}>
        <div className={classes.homeSectionText}>
          <h1 className={classes.h1}>Class Monitor App</h1>
          <p className={classes.p}>Manage your students records, assignments and projects using the class monitor app.</p>
          {studentDetails.value === null ? 
            <div className={classes.homeButton}>
              <input type="button" value="Register" className={classes.registerButton} id="homeRegisterBtn" style={{marginRight:'20px'}} onClick={()=> navigate(`/signup`)}/>
              <input type="button" value="Login" className={classes.loginButton} id="homeLoginBtn" style={{marginLeft:'20px'}} onClick={()=> navigate(`/signin`)}/>
            </div>
          : 
            <Button color='success' variant='contained' onClick={()=> navigate(`/dashboard`)}>My Dashboard</Button>
          } 
        </div>
      </div>
    </div>
  )
}

export default Home