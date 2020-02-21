import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './components/Home/';
import Administracion from './components/Administracion/';
import Estadisticas from './components/Estadisticas/';
import Comparacion from './components/Comparacion/';
require('dotenv').config();

function App() {
  return (
    <div style={{ backgroundColor: 'transparent', height: '100vh'}}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/administracion" component={Administracion} />
        <Route path="/estadisticas" component={Estadisticas} />
        <Route path="/comparacion" component={Comparacion} />
      </Router>
    </div>
  );
}

export default App;