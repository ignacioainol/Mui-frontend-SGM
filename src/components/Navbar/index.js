import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    typography: {
      
    }
  });

export default function Navbar() {


    return (
        <ThemeProvider theme={theme}>
            <typography fontWeight={'fontWeight'} >HOLAMUNDO</typography>
        </ThemeProvider>
    )

    // return (
    //     <div>
    //         <AppBar position="static">
    //             <Toolbar>
    //                 <IconButton edge="start" color="inherit" aria-label="menu">
    //                     <MenuIcon />
    //                 </IconButton>
    //                 <Link to="/" color={'inherit'}>
    //                     <Button variant="contained" color="primary" disableElevation>
    //                         Inicio
    //                     </Button>
    //                 </Link>
    //             </Toolbar>
    //         </AppBar>
    //     </div>
    // );
}