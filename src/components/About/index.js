import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function About() {

  const classes = useStyles;
  return (
    <div>
      <h1>About</h1>
    </div>

  );
}

export default About;