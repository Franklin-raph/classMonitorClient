import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';

import Image from '../images/bg.jpg';
import { Button } from '@mui/material';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

const useStyles = makeStyles(theme => ({
  homeSection: {
    background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Image})`,
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
    backgroundColor: 'transparent',
    padding: '7px 40px',
    color:'#fff',
    outline: 'none',
    border:'2px solid #fff',
    [theme.breakpoints.down('sm')] : {
      marginRight: '20px',
      marginTop:'20px'
    }
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
  const studentDetails = useSelector(state => state.student)

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
              <input type="button" value="Register" className={classes.registerButton} style={{marginRight:'20px'}} onClick={()=> console.log("first")}/>
              <input type="button" value="Login" className={classes.loginButton} style={{marginLeft:'20px'}} onClick={()=> console.log("first")}/>
            </div>
          : 
            <Button color='success' variant='contained' onClick={()=> console.log("first")}>My Dashboard</Button>
          } 
        </div>
      </div>
    </div>
  )
}

export default Home