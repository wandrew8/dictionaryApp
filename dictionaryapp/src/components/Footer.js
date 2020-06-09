import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { variables } from './styles/variables';

const StyledFooter = styled.footer`
    background-color: ${props =>
    variables[props.theme.theme].primary };
    color: ${props =>
    variables[props.theme.theme].white };
    width: 100vw;
    position: relative;
    .mainContent {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2rem;
    padding: 3rem;
    .link {
        display: block;
        color: ${props =>
        variables[props.theme.theme].white };
        text-decoration: none;
    }
    }
    .bottom {
        text-align: center;
        background-color: ${props =>
        variables[props.theme.theme].secondary };
        width: 100%;
        margin: 0;
        padding: 2rem;
        a {
            color: ${props =>
            variables[props.theme.theme].white };
            text-decoration: none;

        }
    }
    img {
        height: 50px;
        width: 100vw;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
    
`;

function Footer(props) {
    const { theme } = props;
    console.log(theme.theme)
    return (
        <StyledFooter>
                <img src={require(`../images/${theme.theme}.svg`)} alt="" />
                <div className="mainContent">
                    <div className="info">
                        <h2>Dictionary App</h2>
                        <p>Here is where the description of the application fits</p>
                    </div>
                    <div className="navigation">
                        <h2>Navigation</h2>
                        <div>
                            <Link className="link" to="/">Search</Link>
                            <Link className="link" to="/collection">Your Collection</Link>
                            <Link className="link" to="/practice">Practice</Link>
                            <Link className="link" to="/create-account">Create Account</Link>
                        </div>
                    </div>
                </div>
                <div className="bottom">&copy; Copyright 2020: <a href="http://www.andrewjohnweiss.com" target="_blank">Andrew John Weiss</a></div>
        </StyledFooter>
    )
}

export default withTheme(Footer);
