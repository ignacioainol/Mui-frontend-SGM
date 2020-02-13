import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './components/Home/';
import About from './components/About/';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function App() {

  const classes = useStyles;
  return (
    <div style={{ backgroundColor: '#222222', height: '100vh'}}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}

export default App;