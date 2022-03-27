import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const TopBar = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 1, zIndex:'999' }}>
          <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Newssddfgfrgrgrt5trtg5rg5h5t5rr5h56th5t5yr55gh565bt6gdfyhgdn6dh56e
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </Box>
    </div>
  )
}

export default TopBar