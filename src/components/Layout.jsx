import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSelector } from 'react-redux'

const drawerWidth = 210

const useStyles = makeStyles({
    
    root: {
        display: 'flex'
    },
    drawer : {
        width:drawerWidth,
        paddingTop: 50,
    },
    active : {
        background: '#D3D3D3 !important'
    },
    appbar : {
        marginLeft: '200px',
        // width: `calc(100% - ${drawerWidth}) !important`,
        backgroundColor: '#2e7d32',
        color: '#fff'
        
    },
    toolbar : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '25px',
        paddingRight: '25px',
        height: '60px'
    }
})

const Layout = ({ children }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const [studentName, setStudentName] = useState()

    const storageItem = localStorage.getItem('studentDetails')

    const studentDetails = useSelector(state => state.student)

    
    
    const handleSignOut = () => {
        fetch('https://classroommonitorbackend.herokuapp.com/auth/student/logout')
        navigate(`/`)

        localStorage.removeItem('studentDetails')

        window.location.reload(true)
    }

    useEffect(() => {
        if(storageItem) setStudentName(studentDetails.value.signedInStudent.name)
        else setStudentName("")
    },[])


  return (
    <div>
        <div className={classes.appbar}>
            <div className={classes.toolbar}>
                <h2> Class Monitor </h2>
                { studentName ? <h4> Welcome, {studentName} </h4> : null}
            </div>
        </div>
        < div className={classes.root}>
            <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{ paper: classes.drawer}}
            >
                {/* <div>
                    <Typography variant='h5' sx={{m:1}}>
                        Nav
                    </Typography>
                </div> */}
                <List>
                    {!storageItem ?
                    <>
                        <ListItem 
                        button
                        onClick={() => navigate(`/signin`)}
                        className={location.pathname === "/signin" ? classes.active : null}
                        >
                            <Tooltip title="Login" placement="right">
                                <IconButton>
                                    <LoginIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    Sign in
                            </ListItemText>
                        </ListItem>

                        <ListItem 
                        button
                        onClick={() => navigate(`/signup`)}
                        className={location.pathname === "/signup" ? classes.active : null}
                        >
                            <Tooltip title="View all students" placement="right">
                                <IconButton>
                                    <LoginIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    Sign up
                            </ListItemText>
                        </ListItem>
                    </> : 
                    <>
                        <ListItem 
                        button
                        onClick={() => navigate(`/allstudents`)}
                        className={location.pathname === "/allstudents" ? classes.active : null}
                        >
                            <Tooltip title="View all students" placement="right">
                                <IconButton>
                                    <VisibilityIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    View all students
                            </ListItemText>
                        </ListItem>

                        <ListItem 
                        button
                        onClick={() => navigate(`/dashboard`)}
                        className={location.pathname === "/dashboard" ? classes.active : null}
                        >
                            <Tooltip title="About" placement="right">
                                <IconButton>
                                    <DashboardIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    Dashboard
                            </ListItemText>
                        </ListItem>

                        <ListItem 
                        button
                        onClick={handleSignOut}
                        >
                            <Tooltip title="Logout" placement="right">
                                <IconButton>
                                    <LogoutIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    Sign out
                            </ListItemText>
                        </ListItem>
                    </>
                    }
                        <ListItem 
                        button
                        onClick={() => navigate(`/about`)}
                        className={location.pathname === "/about" ? classes.active : null}
                        >
                            <Tooltip title="About" placement="right">
                                <IconButton>
                                    <InfoIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            <ListItemText>
                                    About
                            </ListItemText>
                        </ListItem>
                </List>
            </Drawer>
            {children}
        </div>
    </div>
  )
}

export default Layout