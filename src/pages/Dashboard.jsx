import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress, Grid, Typography, Card, } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '-70px',
    padding: '80px 30px 30px 30px',
    textAlign: 'center',
    backgroundColor:'rgb(0, 33, 65) !important',
    color: '#fff !important'
  },
  paperStyle: {
    padding: 20,
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
    marginBottom: 30,
    [theme.breakpoints.down("lg")] : {
        marginTop: '1rem',
        marginBottom: '4rem'
    }
},
innerCardDesign : {
  display: 'flex',
  justifyContent:'center',
  // alignItems: 'center',
  flexDirection: 'column'
},
innerCardText : {
  marginLeft : 20,
  display:'flex',
},
links : {
  textDecoration: 'none'
},
}))

const Dashboard = () => {

  const navigate = useNavigate();

  const studentDetails = useSelector(state => state.student)
  if(studentDetails.value === null){
    navigate(`/login`)
  }

  // const location = useLocation()
  // const { id } = useParams();
  // const { task_id } = useParams();

  const classes = useStyles()
  

  const [allStudentAssessments, setallStudentAssessments] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect( async () => {

    try {
      const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/getAllAssessment')
      const allAssessment = await resp.json()
      //https://classmonitorapp.herokuapp.com/assessment/getAllAssessment
        setallStudentAssessments(allAssessment)
        console.log(allAssessment)
      
    } catch (error) {
      console.log(error)
    } 
  },[])

  allStudentAssessments.map((assessment) => {
    const date = new Date(assessment.createdAt).toDateString()
    console.log(date)
  })

  console.log(allStudentAssessments)



    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



  return (
    <Container className={classes.containerStyle}>
      <div className={classes.avatarBox}>
        <Avatar sx={{ backgroundColor:'#808080', fontSize:'5rem'}} className={classes.avatar}><img width={150} height={150} src={studentDetails.value.signedInStudent.avatar} /></Avatar>
      </div>
      <Paper elevation={3} className={classes.paper}>
        
        <div className={classes.nameandemail}>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Name : </span>{studentDetails.value.signedInStudent.firstName}</p>
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
                  sx={{marginTop:'10px', marginRight:'5px'}}
              >
                  Update Account
        </Button>
        <Button
                  variant="contained" 
                  color="success"
                  onClick= {() => navigate(`/profilepicupload/${studentDetails.value.signedInStudent.studentID}`) }
                  sx={{marginTop:'10px'}}
              >
                  Upload Profile Picture
        </Button>

            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, margin: '18px auto' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search For A Task"
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
      <Grid container spacing={{ xs: 2, md: 3 }} >
            {allStudentAssessments.length !== 0 ?
                allStudentAssessments.filter((val) => {
                  console.log(typeof val.task)
                    if(searchInput === "") return val
                    else if (val.task.toLowerCase().includes(searchInput.toLowerCase()) || val.reference.toLowerCase().includes(searchInput.toLowerCase())) return val
                })
                .map((assessment) => {
                    return (
                    <Grid item key={assessment._id} xs={12} sm={6} md={6}>
                      <Link to={`/taskdetails/${assessment._id}`} className={classes.links}>
                            <Card elevation={3} className={classes.paperStyle}>
                                <div className={classes.innerCardDesign}>
                                    <div className={classes.innerCardText}>
                                        <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Task:</h6>
                                        <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{assessment.task}</Typography>
                                    </div>
                                    <div className={classes.innerCardText}>
                                      <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Reference:</h6>
                                      <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{assessment.reference}</Typography>
                                    </div>
                                    <div className={classes.innerCardText}>
                                      <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Date Given:</h6>
                                      <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{new Date(assessment.createdAt).toDateString()}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </Grid> 
                    )
                }):(
                <Backdrop sx={{ color: '#002141', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                >
                <CircularProgress color="inherit" />
                </Backdrop>
            )}
      </Grid>

    </Container>
  )
}

export default Dashboard