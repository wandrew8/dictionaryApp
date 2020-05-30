import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ThemeItem from './ThemeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust, faBars, faArrowRight, faSignOutAlt, faPalette } from '@fortawesome/free-solid-svg-icons'
import { variables } from '../components/styles/variables';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavBar = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    box-shadow: ${variables.boxShadow};
    display: flex;
    justify-content: flex-end;
    padding: 0rem 3rem;
    align-items: center;
    background: ${props => variables[props.theme.theme].primary};
    .drawer {
        right: 0px;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].backgroundLight };
        position: absolute;
        top: 50px;
        width: 300px;
        z-index: 11;
        border-left: 2px solid gray;
        border-bottom: solid 2px gray;
        transition: 350ms ease-in-out;
        padding-bottom: 5rem;
        height: calc(100vh - 50px);
        overflow: auto;
    }
    .open {
        transform: translateX(300px);
    }
    .selected {
        background-color: lightgrey;
    }
    ul {
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .icon {
        cursor: pointer;
    }
    li {
        list-style: none;
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        transition: 200ms ease-in;

        &:hover {
            background: lightgray;
        }
    }
    .avatar img {
        height: 35px;
        width: 35px;
        margin-right: 1rem;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.8);
        border-radius: 50%;
    }
`;

const LoggedIn = styled.div`
    padding: 0rem 2rem 0rem 1rem;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NavSection = styled.nav`
    text-align: left;
    padding: 0rem 1rem;
    .signOut {
        display: block;
        padding: 0.5rem;
        font-size: 1rem;
        background: transparent;
        border: none;
        font-family: ${variables.primaryFont};
        transition: 200ms ease-in;
        width: 100%;
        text-align: left;
        cursor: pointer;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        &:hover {
            background: lightgray;
        }
    }
    h3 {
        margin: 1rem 1rem 0rem 1rem;
        padding: 0rem;
    }
    a {
        font-size: 1rem;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        text-decoration: none;
        display: block;
        padding: 0.5rem;
        transition: 200ms ease-in;
        &:hover {
            background: lightgray;
        }

    }
    p{
        font-size: 1rem;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        padding: 0.5rem;
        margin: 0;
        transition: 200ms ease-in;
        cursor: pointer;
        &:hover {
            background: lightgray;
        }
    }
   
`

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
                        <Link to="/create-account">Sign in / Create Account</Link>
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
                </div>
            </NavBar>
        )
    }
}

