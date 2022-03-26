import React from 'react'
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

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    drawer : {
        width:240
    },
    active : {
        background: '#D3D3D3 !important'
    }
})

const Layout = ({ children }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(typeof location.pathname)
    const storageItem = localStorage.getItem('jwt')
    // console.log(storageItem)

    const handleSignOut = () => {
        fetch('http://localhost:5000/auth/student/logout')
        navigate(`/`)

        localStorage.removeItem('jwt')
        
    }

  return (
    <div className={classes.root}>
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawer}}
        >
            <div>
                <Typography variant='h5' sx={{m:1}}>
                    Nav
                </Typography>
            </div>
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
                                <VisibilityIcon color="success"/>
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
  )
}

export default Layout