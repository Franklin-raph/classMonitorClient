import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress, Grid, Typography, Card, } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams } from 'react-router-dom'

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
        marginTop: '4rem',
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
}))

const Dashboard = () => {

  const studentDetails = useSelector(state => state.student)

  const location = useLocation()
  const { id } = useParams();

  const classes = useStyles()
  const navigate = useNavigate();
  const [solution, setSolution] = useState("");
  const [solutionError, setSolutionError] = useState(false);
  const [assignmentErrorText, setAssignmentErrorText] = useState("");
  const [allStudentAssessments, setallStudentAssessments] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const studentID = studentDetails.value.signedInStudent.studentID

  useEffect( async () => {

    try {
      const resp = await fetch('https://classroommonitorbackend.herokuapp.com/assessment/getAssessment')
      const allAssessment = await resp.json()
      
        setallStudentAssessments(allAssessment)
      
    } catch (error) {
      console.log(error)
    } 
  },[])

  allStudentAssessments.map((assessment) => {
    const date = new Date(assessment.createdAt).toDateString()
    console.log(date)
  })

  console.log(allStudentAssessments)

  // Method to handle assignment Submission
  const handleAssessmentSubmit = async (e) => {
    e.preventDefault()

    if(solution === ''){
      setSolutionError(true)
      setAssignmentErrorText("Paste the link to your assignment above in the input field")
      setTimeout(() => setAssignmentErrorText(""), 2000)
    }else{
      
        setSolutionError(false)
        try {
          const resp = await fetch('https://classroommonitorbackend.herokuapp.com/assessment/solution', {
          method: 'POST',
          body: JSON.stringify({studentID, solution}),
          headers: {
                "Content-type": "application/json"
          },
          mode: "cors"
        })
    
        const data = await resp.json();
        console.log(data)
        } catch (error) {
          console.log(error)
        }
      }  
    }

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



  return (
    <Container className={classes.containerStyle}>
      <div className={classes.avatarBox}>
        <Avatar sx={{ backgroundColor:'#808080', fontSize:'5rem'}} className={classes.avatar}><img width={150} height={150} src={studentDetails.value.signedInStudent.avatar} /></Avatar>
      </div>
      <Paper elevation={3} className={classes.paper}>
        
        <div className={classes.nameandemail}>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Name : </span>{studentDetails.value.signedInStudent.name}</p>
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
                  >
                      Submit
            </Button>
          </form>
          <small style={{ color: 'red'}}><i>{assignmentErrorText}</i></small>

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
                    if(searchInput === "") return val
                    else if (val.task.toLowerCase().includes(searchInput.toLowerCase()) || val.reference.toLowerCase().includes(searchInput.toLowerCase())) return val
                })
                .map((assessment) => {
                    return (
                    <Grid item key={assessment.id} xs={12} sm={6} md={6}>
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