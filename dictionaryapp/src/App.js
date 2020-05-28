import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/styles/GlobalStyle';
import storage from 'local-storage-fallback';
import Home from './pages/Home';
import Review from './pages/Review';
import Collection from './pages/Collection';
import SignIn from './pages/SignIn';

class App extends React.Component {
  state = {
    nightMode: storage.getItem("nightMode") ? storage.getItem("nightMode") : "light",
    theme: storage.getItem("theme") ? storage.getItem("theme") : "mohaka",
  }

  toggleNightMode = () => {
    if(this.state.nightMode === "light"){
      this.setState({ nightMode: "dark" })
      storage.setItem("nightMode", "dark");
    } else {
      this.setState({ nightMode: "light" });
      storage.setItem("nightMode", "light");
    }
  }

  toggleTheme = (theme) => {
    this.setState({ theme })
    storage.setItem("theme", theme)
  }

  getInitalTheme = () => {
    const savedNightMode = storage.getItem("nightMode");
    return savedNightMode ? JSON.parse(savedNightMode) : false;
  }

  render() {
      return (
        <Router basename="/dictionaryApp/">
          <Switch>
              <ThemeProvider theme={{ nightMode: this.state.nightMode, theme: this.state.theme }}>
                <Route exact path="/">
                  <Home 
                    toggleNightMode={this.toggleNightMode} 
                    nightMode={this.state.nightMode}
                    toggleTheme={this.toggleTheme}
                    theme={this.state.theme}
                     />
                </Route>
                <Route path="/collection">
                  <Collection
                    toggleNightMode={this.toggleNightMode} 
                    nightMode={this.state.nightMode}
                    toggleTheme={this.toggleTheme}
                    theme={this.state.theme}
                    />
                </Route>
                <Route path="/create-account">
                  <SignIn 
                    toggleNightMode={this.toggleNightMode} 
                    nightMode={this.state.nightMode}
                    toggleTheme={this.toggleTheme}
                    theme={this.state.theme} 
                    />
                </Route>
                <Route path="/review">
                  <Review 
                    toggleNightMode={this.toggleNightMode} 
                    nightMode={this.state.nightMode}
                    toggleTheme={this.toggleTheme}
                    theme={this.state.theme} 
                    />
                </Route>
                <GlobalStyle />
              </ThemeProvider>
          </Switch>
      </Router>
    );
  }
}

export default App;
