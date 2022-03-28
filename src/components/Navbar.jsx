import React from 'react'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

const Navbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h1" component="h1">
                Class Monitor
            </Typography>
        </Toolbar>
      </AppBar> 
    </>
  )
}

export default Navbar