import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RelationRepository from '../../models/Relations';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0 2em'
  },
  paper: {
    padding: '2em',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

function Administracion() {

  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChangeSystem = async (event) => {

    try {
      const schemas = await RelationRepository.getSystems();
      console.log(schemas);
    } catch (error) {
      console.log(error);
    }
    // setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h2>Administración - Relaciones</h2>


          <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={value}
            onChange={handleChangeSystem}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        </Paper>
      </Grid>
    </div>

  );
}

export default Administracion;