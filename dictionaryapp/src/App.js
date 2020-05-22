import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/styles/GlobalStyle';
import Home from './pages/Home';
import User from './pages/User';
import SignIn from './pages/SignIn';

class App extends React.Component {
  state = {
    nightMode: true
  }

  toggleNightMode = () => {
    this.setState({ nightMode: !this.state.nightMode })
  }

  render() {
      return (
        <Router basename="/dictionaryApp/">
          <Switch>
              <ThemeProvider theme={{ nightMode: this.state.nightMode }}>
                <Route exact path="/">
                  <Home toggleNightMode={this.toggleNightMode} nightMode={this.state.nightMode} />
                </Route>
                <Route path="/user" component={User} />
                <Route path="/create-account" component={SignIn} />
                <GlobalStyle />
              </ThemeProvider>
          </Switch>
      </Router>
    );
  }
}

export default App;
