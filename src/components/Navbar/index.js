import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import crecicLogo from '../../images/crecicLogo.png';
import { Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import  MusicVideoIcon from '@material-ui/icons/MusicVideo';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  buttonMod: {
    backgroundColor: 'transparent',
    border: 0,
    color: 'white',
    height: 40,
    fontWeight: 'bold'
  },
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Navbar() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClick3 = event => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
          >

            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MusicVideoIcon />
              </IconButton>
              <Link to="/" color={'inherit'}>
                <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
                  <HomeIcon style={{marginTop: '-4px' }}/> Inicio
                </Button>
              </Link>

              <Link to="/administracion" color={'inherit'}>
                <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
                  Administración
                </Button>
              </Link>

              <Link to="/estadisticas" color={'inherit'}>
                <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
                  Estadisticas
              </Button>
              </Link>

              <Link to="/comparacion" color={'inherit'}>
                <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
                  Comparación
                </Button>
              </Link>

              <Button
                aria-controls="customized-menu"
                className={classes.buttonMod}
                onClick={handleClick}
              >
                Visualización
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <AccountTreeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Relaciones" />
                </StyledMenuItem>
                <StyledMenuItem>
                  <ListItemIcon>
                    <ViewModuleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Módulos" />
                </StyledMenuItem>
              </StyledMenu>

              <Button
                aria-controls="customized-menu2"
                className={classes.buttonMod}
                onClick={handleClick2}
              >
                Ayuda
              </Button>
              <StyledMenu
                id="customized-menu2"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Visualización" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Comparación" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Estadisticas" />
                </StyledMenuItem>

                <StyledMenuItem>
                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Administración" />
                </StyledMenuItem>

              </StyledMenu>

            </Grid>

            <Grid item>
              <div style={{ marginTop: '5px' }}>
                <Typography variant="h6" gutterBottom>
                  <span>Semdat &nbsp;</span>
                  <img src={crecicLogo} style={{ width: '1em', marginTop: '10px', marginBottom: '-3px' }} />
                </Typography>
              </div>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}