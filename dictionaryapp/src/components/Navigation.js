import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import { variables } from '../components/styles/variables';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavBar = styled.nav`

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
            <nav>
                <Link to="/user">User</Link>
                <Link to="/">Home</Link>
                <Link to="/create-account">Sign Up</Link>
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
            </nav>
        )
    }
}

