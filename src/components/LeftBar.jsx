import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login';
import { makeStyles } from '@mui/styles'
import LogoutIcon from '@mui/icons-material/Logout';

// const useStyles = makeStyles( theme => ({
//     container : {
//         backgroundColor: theme.palette.primary.main,
//         color: '#fff',
//         height: '100vh',
//         paddingTop: '70px'
//     },
//     item : {
//         display:'flex',
//         alignItems:'center',
//         justifyContent: 'center',
//         padding: '20px 5px !important',
//         [theme.breakpoints.up("sm")] : {
//             cursor: 'pointer',
//         },
//         [theme.breakpoints.down("sm")] : {
//             padding: '20px 0px !important',
//         },
//     },

//     text : {
//         [theme.breakpoints.down("sm")] : {
//             display: 'none',
//         }, 
//     }
// }))

const LeftBar = () => {

    // const classes = useStyles();

  return (
    <Container >
        {/* <div className={classes.item}>
            <LoginIcon className={classes.icon}/>
            <Typography className={classes.text}>Login</Typography>
        </div>

        <div className={classes.item}>
            <LoginIcon className={classes.icon}/>
            <Typography className={classes.text}>Login</Typography>
        </div>

        <div className={classes.item}>
            <LoginIcon className={classes.icon}/>
            <Typography className={classes.text}>Login</Typography>
        </div>

        <div className={classes.item}>
            <LoginIcon className={classes.icon}/>
            <Typography className={classes.text}>Login</Typography>
        </div>

        <div className={classes.item}>
            <LoginIcon className={classes.icon}/>
            <Typography className={classes.text}>Login</Typography>
        </div>*/}
    </Container> 
  )
}

export default LeftBar