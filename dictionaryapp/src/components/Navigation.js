import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeItem from './ThemeItem';
import Logo from '../components/Logo';
import { variables } from './styles/variables';
import { NavBar, LoggedIn, NavSection } from './styles/components/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust, faBars, faArrowRight, faSignOutAlt, faPalette } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


export default function Navigation(props) {
    const [ themeValue, setThemeValue ] = useState('');
    const [ drawerOpen, setDrawerOpen ] = useState(false);
    const navRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        }
    }, []);
    
    // This closes the navigation drawer when a user clicks outside of the drawer
    const handleClick = (e) => {
        if(!navRef.current.contains(e.target)) {
            setDrawerOpen(false);
        }
    }

    const setTheme = (theme) => {
        setThemeValue(theme);
        props.toggleTheme(theme);
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const closeDrawer = () => {
        setDrawerOpen(false)
    }


    const { nightMode, toggleNightMode, signout, currentTheme, isSignedIn, userImage } = props
    return (
        <NavBar ref={navRef}>
            <Logo theme={currentTheme} />
            <div className="flexItem">
                <div className="navLinks">
                    <NavLink 
                        className="link"
                        activeStyle={{ borderBottom: "5px solid rgba(0, 0,0,0.1)" }}
                        exact
                        to="/">
                        Search
                    </NavLink>
                    <NavLink 
                        className="link"
                        activeStyle={{ borderBottom: "5px solid rgba(0, 0,0,0.1)" }} 
                        exact
                        to="/collection">
                        Your Collection
                    </NavLink>
                    <NavLink 
                        className="link"
                        activeStyle={{ borderBottom: "5px solid rgba(0, 0,0,0.1)" }} 
                        exact
                        to="/practice">
                        Practice
                    </NavLink>
                    {isSignedIn ? null : <NavLink 
                        className="link"
                        activeStyle={{ borderBottom: "5px solid rgba(0, 0,0,0.1)" }}
                        exact
                        to="/create-account">
                        Create Account
                    </NavLink>}
                </div>
                <div className="avatar">
                    {isSignedIn && userImage ? <img src={userImage} alt={`avatar`} /> : null}
                </div>
                <FontAwesomeIcon 
                    icon={ faBars } 
                    color={ variables.primaryWhite } 
                    className="icon"
                    onClick={toggleDrawer} />
                <div 
                    className={drawerOpen ? "drawer" : "open drawer"}>
                    <LoggedIn>
                        <FontAwesomeIcon 
                            onClick={closeDrawer} 
                            className="icon"
                            style={{ margin: "1rem", fontSize: "1.5rem" }} 
                            icon={ faArrowRight } 
                            color={nightMode === "light" ? variables.primaryWhite : variables.primaryDark} />
                            <p>{isSignedIn ? "You are logged in" : "You are not logged in"}</p>
                    </LoggedIn>
                    <hr/>
                    <NavSection>
                        <h3>Navigation</h3>
                        <hr/>
                        <Link to="/">Search</Link>
                        <Link to="/collection">Your Collection</Link>
                        <Link to="/practice">Practice</Link>
                        {isSignedIn ? null : <Link to="/create-account">Sign in / Create Account</Link>}
                    </NavSection>
                    <NavSection>
                        <h3>Account and Settings</h3>
                        <hr/>
                        <button 
                            onClick={signout} 
                            className="signOut"><FontAwesomeIcon color={nightMode === "light" ? variables.primaryWhite : variables.primaryDark} icon={faSignOutAlt}/> Sign Out</button>
                        <p 
                            className="navItem"
                            onClick={toggleNightMode}>
                            <FontAwesomeIcon 
                                color={nightMode === "light" ? variables.primaryWhite : variables.primaryDark} 
                                icon={faAdjust}/> {nightMode === "light" ? "Dark" : "Light"} Mode
                        </p>
                        <p>
                            <FontAwesomeIcon 
                                color={nightMode === "light" ? variables.primaryWhite : variables.primaryDark} 
                                icon={faPalette} /> Themes
                        </p>
                        <ul>
                            <li 
                                className={currentTheme === "mohaka" ? "selected" : null}
                                onClick={setTheme.bind(this, "mohaka")}>
                                <ThemeItem 
                                    name="Mohaka" 
                                    primary={variables.mohaka.primary}
                                    secondary={variables.mohaka.secondary}
                                    tertiary={variables.mohaka.tertiary}
                                />        
                            </li>
                            <li 
                                className={currentTheme === "inn" ? "selected" : null}
                                onClick={setTheme.bind(this, "inn")}>
                            <ThemeItem 
                                    name="Inn" 
                                    primary={variables.inn.primary}
                                    secondary={variables.inn.secondary}
                                    tertiary={variables.inn.tertiary}
                                />  
                            </li>
                            <li 
                                className={currentTheme === "mataura" ? "selected" : null}
                                onClick={setTheme.bind(this, "mataura")}>
                                <ThemeItem 
                                    name="Mataura" 
                                    primary={variables.mataura.primary}
                                    secondary={variables.mataura.secondary}
                                    tertiary={variables.mataura.tertiary}
                                />  
                            </li>
                            <li 
                                className={currentTheme === "ngaruroro" ? "selected" : null}
                                onClick={setTheme.bind(this, "ngaruroro")}>
                                <ThemeItem 
                                    name="Ngaruroro" 
                                    primary={variables.ngaruroro.primary}
                                    secondary={variables.ngaruroro.secondary}
                                    tertiary={variables.ngaruroro.tertiary}
                                />  
                            </li>
                            <li 
                                className={currentTheme === "taieri" ? "selected" : null}
                                onClick={setTheme.bind(this, "taieri")}>
                                <ThemeItem 
                                    name="Taieri" 
                                    primary={variables.taieri.primary}
                                    secondary={variables.taieri.secondary}
                                    tertiary={variables.taieri.tertiary}
                                />  
                            </li>
                        </ul>
                    </NavSection>
                    <small>Themes come from <a href="https://products.ls.graphics/paaatterns/" target="_blank" className="credit">Paaatterns</a></small>
                </div>
            </div>
        </NavBar>
    )

}

Navigation.propTypes = {
    nightMode: PropTypes.string,
    toggleNightMode: PropTypes.func,
    toggleTheme: PropTypes.func,
    signout: PropTypes.func,
    currentTheme: PropTypes.string,
    isSignedIn: PropTypes.bool,
    userImage: PropTypes.string,
}

