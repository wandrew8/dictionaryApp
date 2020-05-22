import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import './App.css';

function App() {
  return (
    <Router basename="/dictionaryapp/">
        <h1>Dictionary Application</h1>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />

    </Router>
  );
}

export default App;
