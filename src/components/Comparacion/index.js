import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { Select, TextField, Button } from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import RelationRepository from '../../models/Relations';
import ComparacionRepository from '../../models/Comparation';
import MenuItem from '@material-ui/core/MenuItem';
import Autocompletex from './Autocompletex';
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
    },
    autoCompletex: {
        width: '200px !important'
    }
}));

function Comparacion() {
    const classes = useStyles();
    const valueObjNameRef = useRef();

    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [systems, setSystems] = React.useState([]);


    const [valueObj, setValueObj] = React.useState('');
    const [openObj, setOpenObj] = React.useState(false);
    const [object, setObject] = React.useState([]);

    const [valueObjName, setValueObjName] = React.useState([]);
    const [objectsName, setObjectsName] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const systems = await RelationRepository.getSystems();
            setSystems(systems);
        }
        fetchData();
    }, []);


    const handleChangeSystem = async (event) => {

        try {
            setValue(event.target.value);
            let objectData = await ComparacionRepository.getObject(event.target.value);
            setObject(objectData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeObj = async (event) => {
        try {
            setValueObj(event.target.value);

            let params = {
                system: value,
                object: event.target.value
            }

            let nameObjectData = await ComparacionRepository.getNamesObjects(params);
            setObjectsName(nameObjectData);

        } catch (error) {
            throw { error };
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseObj = () => {
        setOpenObj(false);
    };

    const handleOpenObj = () => {
        setOpenObj(true);
    };


    const findData = async (event) => {
        if(value == [] || valueObj == [] || objectsName == []){
            alert("there can be no empty fields");
        }else{
            alert("we are good");

        }
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h2>Comparación</h2>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item>
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

                                <MenuItem value={systems}>{systems}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Objeto</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openObj}
                                onClose={handleCloseObj}
                                onOpen={handleOpenObj}
                                value={valueObj}
                                onChange={handleChangeObj}
                            >
                                <MenuItem>
                                    <em>Seleccione...</em>
                                </MenuItem>

                                {object.map((obj, index) =>
                                    <MenuItem key={index} value={obj}>{obj}</MenuItem>
                                )}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Autocompletex
                        objectsName={objectsName} />
                    </Grid>

                    <Grid>
                        <FormControl className={classes.formControl}>
                            <Button variant="contained" onClick={findData} size="large" style={{ marginTop: '1em' }} color="primary">
                                <SearchIcon style={{ fontSize: '2em' }} />
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>


        </div>

    )
}

export default Comparacion;