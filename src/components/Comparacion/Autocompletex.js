import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  autoCompletex: {
    width: '200px !important'
  }
}));

const objetos = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
];

export default function Autocompletex(props) {

  const { objectsName } = props;
  const classes = useStyles();

  const defaultProps = {
    options: objectsName,
    getOptionLabel: option => option,
  };

  return (
    <Autocomplete
      style={{ marginTop: '-3px !important'}}
      {...defaultProps}
      id="clear-on-escape"
      clearOnEscape
      renderInput={params => <TextField className={classes.autoCompletex} {...params} label="Nombre de Objecto"
      />}
    />
  )
}

