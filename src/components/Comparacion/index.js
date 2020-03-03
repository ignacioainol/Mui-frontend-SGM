import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, TextField, Button, LinearProgress, MenuItem, InputLabel, FormControl, Grid, Paper, Snackbar } from '@material-ui/core/';
import RelationRepository from '../../models/Relations';
import ComparacionRepository from '../../models/Comparation';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import TableComparation from './TableComparation';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Comparacion() {
    const classes = useStyles();

    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [systems, setSystems] = React.useState([]);

    const [valueObj, setValueObj] = React.useState('');
    const [openObj, setOpenObj] = React.useState(false);
    const [object, setObject] = React.useState([]);

    /** State para completar array que se muestra en el autocomplete */
    const [objectsName, setObjectsName] = React.useState([]);
    const [valueObjName, setValueObjName] = React.useState([]);

    /*Barra de loading*/
    const [loading, setLoading] = React.useState(false);

    /* Mensaje de alert */
    const [opensnackBar, setOpensnackBar] = React.useState(false);


    useEffect(() => {
        async function fetchData() {
            const systems = await RelationRepository.getSystems();
            setSystems(systems);
        }
        fetchData();
    }, []);

    const defaultProps = {
        options: objectsName,
        getOptionLabel: option => option,
    };


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
    };

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

    const changeAutocomplete = async (event) => {
        setValueObjName(event.target.textContent);
    }

    const findData = async (event) => {
        if (value == [] || valueObj == [] || valueObjName == 0) {
            setOpensnackBar(true);
        } else {
            setLoading(true);
            const searchData = {
                sistema: value,
                object: valueObj,
                name: valueObjName
            };
            const objeto = await ComparacionRepository.getDatos(searchData);

            console.log(objeto);

            setLoading(false);
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpensnackBar(false);
    };


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
                        <Autocomplete
                            style={{ marginTop: '-3px !important' }}
                            {...defaultProps}
                            id="clear-on-escape"
                            clearOnEscape
                            onChange={changeAutocomplete}
                            renderInput={params => <TextField className={classes.autoCompletex}  {...params} label="Nombre de Objecto"
                            />}
                        />
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

            {loading ?
                <LinearProgress color="secondary" />
                : null
            }

            <TableComparation/>

            <Snackbar open={opensnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning">
                    Por favor seleccionar Sistema, objeto y Nombre de Objeto
                </Alert>
            </Snackbar>

        </div>

    )
}

export default Comparacion;