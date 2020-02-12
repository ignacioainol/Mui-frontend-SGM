import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" color={'inherit'}>
            <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
              Inicio
                        </Button>
          </Link>

          <Link to="/" color={'inherit'}>
            <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
              Administración
                        </Button>
          </Link>

          <Link to="/" color={'inherit'}>
            <Button variant="contained" color="primary" className={classes.buttonMod} disableElevation>
              Estadisticas
                        </Button>
          </Link>

          <Link to="/" color={'inherit'}>
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
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Relaciones" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Módulos" />
            </StyledMenuItem>
          </StyledMenu>

        </Toolbar>
      </AppBar>
    </div>
  );
}