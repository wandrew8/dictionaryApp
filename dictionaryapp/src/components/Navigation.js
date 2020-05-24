import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import { variables } from '../components/styles/variables';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavBar = styled.nav`
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    box-shadow: ${variables.boxShadow};
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: ${props => variables[props.theme.theme].primary};
`;

const StyledLink = styled(Link)`
    color: ${variables.primaryWhite};
    text-decoration: none;
`

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        signOut: PropTypes.func,
    }

    state = {
        themeValue: ''
    }

    handleChange = (e) => {
        this.setState({ themeValue: e.target.value });
        this.props.toggleTheme(e.target.value)
    }

    render() {
        return (
            <NavBar>
                <StyledLink to="/user">User</StyledLink>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/create-account">Sign Up</StyledLink>
                <button onClick={this.props.signOut}>Sign Out</button>
                <FontAwesomeIcon color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} icon={faAdjust} onClick={this.props.toggleNightMode} />
                <form>
                    <select value={this.state.themeValue} onChange={this.handleChange}>
                        <option value="mohaka">Select a Theme</option>
                        <option value="inn">Inn</option>
                        <option value="mataura">Mataura</option>
                        <option value="mohaka">Mohaka</option>
                        <option value="ngaruroro">Ngaruroro</option>
                        <option value="taieri">Taieri</option>
                    </select>
                </form>
            </NavBar>
        )
    }
}

