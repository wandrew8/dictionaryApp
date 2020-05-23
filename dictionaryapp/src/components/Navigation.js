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
    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
    }

    render() {
        return (
            <div>
                <Link to="/user">User</Link>
                <Link to="/">Home</Link>
                <Link to="/errror">Error Page</Link>
                <FontAwesomeIcon color={this.props.nightMode === "light" ? variables.primaryWhite : variables.primaryDark} icon={faAdjust} onClick={this.props.toggleNightMode} />
            </div>
        )
    }
}
