import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    paperStyle: {
        padding: 20,
    },
    innerCardDesign : {
        display: 'flex',
    },
    innerCardText : {
        marginLeft : 20
    },
    links : {
        textDecoration: 'none'
    }
})

const AllStudents = () => {

    const classes = useStyles();

    const [students, setStudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    console.log(searchInput)

    useEffect( async () => {
        try {
            const res = await axios.get('http://localhost:5000/student')
            const data = await res.data
            setStudents(data)
            console.log(data)
            console.log(students)
        } catch (error) {
            console.log(error)
        }
    },[])

  return (
    <Container>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, margin: '18px auto' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for a student"
                    onChange={(e) => {
                        setSearchInput(e.target.value)
                    }}
                />
                <IconButton sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        <Grid container spacing={{ xs: 2, md: 3 }} >
            {students.length !== 0 ?
                students.filter((val) => {
                    if(searchInput === "") return val
                    else if (val.email.toLowerCase().includes(searchInput.toLowerCase()) || val.name.toLowerCase().includes(searchInput.toLowerCase())) return val
                })
                .map((student) => {
                    return (
                    <Grid item key={student.id} xs={12} sm={6} md={4}>
                        <Link to={`/student/${student.studentID}`} className={classes.links}>
                            <Card elevation={3} className={classes.paperStyle}>
                                <div className={classes.innerCardDesign}>
                                    <Avatar sx={{ backgroundColor:'#808080'}}>{student.email.charAt(0)}</Avatar>
                                    <div className={classes.innerCardText}>
                                        <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{student.email}</Typography>
                                        {student.name}
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

export default AllStudents