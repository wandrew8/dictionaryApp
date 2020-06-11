import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/styles/GlobalStyle';
import storage from 'local-storage-fallback';
import Home from './pages/Home';
import Review from './pages/Review';
import WordCollection from './pages/WordCollection';
import Test from './pages/Test';
import PracticeTest from './pages/PracticeTest';
import PracticeFlashCards from './pages/PracticeFlashCards';
import Practice from './pages/Practice';
import Collection from './pages/Collection';
import SignIn from './pages/SignIn';

function App() {
  const [ nightMode, setNightMode ] = useState(storage.getItem("nightMode") ? storage.getItem("nightMode") : "light");
  const [ theme, setTheme ] = useState(storage.getItem("theme") ? storage.getItem("theme") : "mataura");

  const toggleNightMode = () => {
    if(nightMode === "light"){
      setNightMode("dark");
      storage.setItem("nightMode", "dark");
    } else {
      setNightMode("light");
      storage.setItem("nightMode", "light");
    }
  }

  const toggleTheme = (theme) => {
    setTheme(theme);
    storage.setItem("theme", theme)
  }

  const getInitalTheme = () => {
    const savedNightMode = storage.getItem("nightMode");
    return savedNightMode ? JSON.parse(savedNightMode) : false;
  }

    return (
      <Router basename="/dictionaryApp/">
        <Switch>
            <ThemeProvider theme={{ nightMode: nightMode, theme: theme }}>
              <Route exact path="/">
                <Home 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme}
                    />
              </Route>
              <Route path="/collection">
                <Collection
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme}
                  />
              </Route>
              <Route path="/create-account">
                <SignIn 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route path="/review">
                <Review 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route path="/test">
                <Test 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route exact path="/practice">
                <Practice 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route exact path="/practice/:id">
                <WordCollection 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route exact path="/practice-test/:id">
                <PracticeTest 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <Route exact path="/practice-review/:id">
                <PracticeFlashCards 
                  toggleNightMode={toggleNightMode} 
                  nightMode={nightMode}
                  toggleTheme={toggleTheme}
                  theme={theme} 
                  />
              </Route>
              <GlobalStyle />
            </ThemeProvider>
        </Switch>
    </Router>
  );
  
}

export default App;
