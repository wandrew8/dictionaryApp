import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeItem from './ThemeItem';
import Logo from '../components/Logo';
import { NavBar, LoggedIn, NavSection } from './styles/components/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust, faBars, faArrowRight, faSignOutAlt, faPalette } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';


export default class Navigation extends Component {
    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        signout: PropTypes.func,
        currentTheme: PropTypes.string,
        isSignedIn: PropTypes.bool,
        userImage: PropTypes.string,
    }

    state = {
        themeValue: '',
        drawerOpen: false,
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    // This closes the navigation drawer when a user clicks outside of the drawer
    handleClick = (e) => {
        if(!this.node.contains(e.target)) {
            this.setState({ drawerOpen: false });
        }
    }

    setTheme = (theme) => {
        this.setState({ themeValue: theme });
        this.props.toggleTheme(theme)
    }

    toggleDrawer = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
    }

    render() {
        return (
            <NavBar ref={node => this.node = node}>
                <Logo theme={this.props.currentTheme} />
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
                        {this.props.isSignedIn ? null : <NavLink 
                            className="link"
                            activeStyle={{ borderBottom: "5px solid rgba(0, 0,0,0.1)" }}
                            exact
                            to="/create-account">
                            Create Account
                        </NavLink>}
                    </div>
                    <div className="avatar">
                        {this.props.isSignedIn && this.props.userImage ? <img src={this.props.userImage} alt={`${this.props.userName}' avatar`} /> : null}
                    </div>
                    <FontAwesomeIcon 
                        icon={ faBars } 
                        color={ variables.primaryWhite } 
                        className="icon"
                        onClick={this.toggleDrawer} />
                    <div 
                        className={this.state.drawerOpen ? "drawer" : "open drawer"}>
                        <LoggedIn>
                            <FontAwesomeIcon 
                                onClick={this.closeDrawer} 
                                className="icon"
                                style={{ margin: "1rem", fontSize: "1.5rem" }} 
                                icon={ faArrowRight } 
                                color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} />
                                <p>{this.props.isSignedIn ? "You are logged in" : "You are not logged in"}</p>
                        </LoggedIn>
                        <hr/>
                        <NavSection>
                            <h3>Navigation</h3>
                            <hr/>
                            <Link to="/">Search</Link>
                            <Link to="/collection">Your Collection</Link>
                            <Link to="/practice">Practice</Link>
                            {this.props.isSignedIn ? null : <Link to="/create-account">Sign in / Create Account</Link>}
                        </NavSection>
                        <NavSection>
                            <h3>Account and Settings</h3>
                            <hr/>
                            <button 
                                onClick={this.props.signout} 
                                className="signOut"><FontAwesomeIcon color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} icon={faSignOutAlt}/> Sign Out</button>
                            <p 
                                className="navItem"
                                onClick={this.props.toggleNightMode}>
                                <FontAwesomeIcon 
                                    color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} 
                                    icon={faAdjust}/> {this.props.nightMode === "light" ? "Dark" : "Light"} Mode
                            </p>
                            <p>
                                <FontAwesomeIcon 
                                    color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} 
                                    icon={faPalette} /> Themes
                            </p>
                            <ul>
                                <li 
                                    className={this.props.currentTheme === "mohaka" ? "selected" : null}
                                    onClick={this.setTheme.bind(this, "mohaka")}>
                                    <ThemeItem 
                                        name="Mohaka" 
                                        primary={variables.mohaka.primary}
                                        secondary={variables.mohaka.secondary}
                                        tertiary={variables.mohaka.tertiary}
                                    />        
                                </li>
                                <li 
                                    className={this.props.currentTheme === "inn" ? "selected" : null}
                                    onClick={this.setTheme.bind(this, "inn")}>
                                <ThemeItem 
                                        name="Inn" 
                                        primary={variables.inn.primary}
                                        secondary={variables.inn.secondary}
                                        tertiary={variables.inn.tertiary}
                                    />  
                                </li>
                                <li 
                                    className={this.props.currentTheme === "mataura" ? "selected" : null}
                                    onClick={this.setTheme.bind(this, "mataura")}>
                                    <ThemeItem 
                                        name="Mataura" 
                                        primary={variables.mataura.primary}
                                        secondary={variables.mataura.secondary}
                                        tertiary={variables.mataura.tertiary}
                                    />  
                                </li>
                                <li 
                                    className={this.props.currentTheme === "ngaruroro" ? "selected" : null}
                                    onClick={this.setTheme.bind(this, "ngaruroro")}>
                                    <ThemeItem 
                                        name="Ngaruroro" 
                                        primary={variables.ngaruroro.primary}
                                        secondary={variables.ngaruroro.secondary}
                                        tertiary={variables.ngaruroro.tertiary}
                                    />  
                                </li>
                                <li 
                                    className={this.props.currentTheme === "taieri" ? "selected" : null}
                                    onClick={this.setTheme.bind(this, "taieri")}>
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
}

