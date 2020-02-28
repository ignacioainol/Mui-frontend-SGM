import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  autoCompletex: {
    width: '200px !important'
  }
}));

export default function Autocompletex(props) {

  const { objectsName } = props;
  const classes = useStyles();

  const defaultProps = {
    options: objectsName,
    getOptionLabel: option => option,
  };

  const dataSetChange = async (e) => {
    console.log(e.target.textContent);
}

  return (
    <Autocomplete
      style={{ marginTop: '-3px !important'}}
      {...defaultProps}
      onChange={dataSetChange}
      id="clear-on-escape"
      clearOnEscape
      renderInput={params => <TextField className={classes.autoCompletex} {...params} label="Nombre de Objecto"
      />}
    />
  )
}

