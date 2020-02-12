import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/';
import About from './components/About';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {

  const classes = useStyles;
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/about"
              component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;