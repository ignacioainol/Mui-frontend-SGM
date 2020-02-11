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

const useStyles = makeStyles({
    root: {
      backgroundColor: 'transparent',
      border: 0,
      color: 'white',
      height: 48,
      fontWeight: 'bold',
      padding: '0 30px',
    },
  });

export default function Navbar() {

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" color={'inherit'}>
                        <Button variant="contained" className={classes.root} disableElevation>
                            Inicio
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}