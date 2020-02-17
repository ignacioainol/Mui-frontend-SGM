import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select, TextField } from '@material-ui/core/';
import RelationRepository from '../../models/Relations';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '0 2em'
  },
  paper: {
    padding: '2em',
    color: theme.palette.text.secondary,
    textAlign: 'center'
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
  const [schemas, setSchemas] = React.useState([]);

  const [valueBd, setValueBd] = React.useState('');
  const [openBd, setOpenBd] = React.useState(false);
  const [bbdd, setBbdd] = React.useState([]);

  const [valueEsquema, setValueEsquema] = React.useState('');
  const [openEsquema, setOpenEsquema] = React.useState(false);
  const [esquema, setEsquema] = React.useState([]);

  const [valueObject, setValueObject] = React.useState('');
  const [openObject, setOpenObject] = React.useState(false);
  const [objeto, setObjeto] = React.useState([]);

  useEffect(async () => {
    const schemas = await RelationRepository.getSystems();
    setSchemas(schemas);

    console.log(bbdd);
  }, []);

  const handleChangeSystem = async (event) => {

    try {
      setValue(event.target.value);
      const ddbb = await RelationRepository.getDatabases(event.target.value);
      setBbdd(ddbb);
      console.log(ddbb);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeBd = async (event) => {
    try {
      setValueBd(event.target.value);
      const esquemas = await RelationRepository.getSchemas(event.target.value);
      setEsquema(esquemas);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeEsquema = async (event) => {
    try {
      setValueEsquema(event.target.value);
      const objeto = await RelationRepository.getObjects(event.target.value);
      setObjeto(objeto);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeObject = async (event) => {
    try {
      setValueObject(event.target.value);

    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseBd = () => {
    setOpenBd(false);
  };

  const handleOpenBd = () => {
    setOpenBd(true);
  };

  const handleCloseEsquema = () => {
    setOpenEsquema(false);
  };

  const handleOpenEsquema = () => {
    setOpenEsquema(true);
  };

  const handleCloseObject = () => {
    setOpenObject(false);
  };

  const handleOpenObject = () => {
    setOpenObject(true);
  };

  console.log(schemas);
  return (
    <div className={classes.root}>
      <Grid item>
        <Paper className={classes.paper}>
          <h2>Administración - Relaciones</h2>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Sistema</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={value}
              onChange={handleChangeSystem}
            >
              <MenuItem>
                <em>Seleccione...</em>
              </MenuItem>

              <MenuItem value={schemas}>{schemas}</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Database</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openBd}
              onClose={handleCloseBd}
              onOpen={handleOpenBd}
              value={valueBd}
              onChange={handleChangeBd}
            >
              <MenuItem>
                <em>Seleccione...</em>
              </MenuItem>

              {bbdd.map(bd =>
                <MenuItem value={bd}>{bd}</MenuItem>
              )
              }
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Esquemas</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openEsquema}
              onClose={handleCloseEsquema}
              onOpen={handleOpenEsquema}
              value={valueEsquema}
              onChange={handleChangeEsquema}
            >
              <MenuItem>
                <em>Seleccione...</em>
              </MenuItem>

              {esquema.map(schema =>
                <MenuItem value={schema}>{schema}</MenuItem>
              )
              }
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Objecto</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openObject}
              onClose={handleCloseObject}
              onOpen={handleOpenObject}
              value={valueObject}
              onChange={handleChangeObject}
            >
              <MenuItem>
                <em>Seleccione...</em>
              </MenuItem>

              {objeto.map(obj =>
                <MenuItem value={obj}>{obj}</MenuItem>
              )
              }
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField id="standard-basic" label="Nombre del Objeto" />
          </FormControl>

          <FormControl className={classes.formControl}>
            <SearchIcon />
          </FormControl>
        </Paper>
      </Grid>
    </div>

  );
}

export default Administracion;