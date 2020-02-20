import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './components/Home/';
import Administracion from './components/Administracion/';
import Estadisticas from './components/Estadisticas/';
require('dotenv').config();

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {

  const classes = useStyles;
  return (
    <div style={{ backgroundColor: 'transparent', height: '100vh'}}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/administracion" component={Administracion} />
        <Route path="/estadisticas" component={Estadisticas} />
      </Router>
    </div>
  );
}

export default App;