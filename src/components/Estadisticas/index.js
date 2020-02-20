import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { Select, TextField, Button } from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import RelationRepository from '../../models/Relations';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Estadisticas() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [opensnackBar, setOpensnackBar] = React.useState(false);
    const [schemas, setSchemas] = React.useState([]);
    const [systems, setSystems] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        async function fetchData() {
            const schemas = await RelationRepository.getSystems();
            setSchemas(schemas);
        }
        fetchData();
    }, []);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = async (event) => {

        try {
            setSystems(event.target.value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpensnackBar(false);
    };

    const sendData = async (event) => {
        if (systems == "" || systems == undefined) {
            setOpensnackBar(true);
        } else {
            setLoading(true);
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h2>Estadisticas</h2>
                <h3>Seleccione un sistema</h3>
                <Grid container>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Sistema</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={systems}
                                onChange={handleChange}
                            >
                                <MenuItem>
                                    <em>Seleccione...</em>
                                </MenuItem>

                                <MenuItem value={schemas}>{schemas}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={sendData} size="large" style={{ marginTop: '1em' }} color="primary">
                            Buscar
                            </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Paper>
            {loading ?
                <LinearProgress color="secondary" />
                : null}

            <Snackbar open={opensnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning">
                    Por favor seleccionar un sistema
                </Alert>
            </Snackbar>

            <div className={classes.root}>
                
            </div>

        </div>

    )
}

export default Estadisticas;