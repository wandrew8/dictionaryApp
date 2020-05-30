import React, { Component } from 'react';
import ReactTooltip from "react-tooltip"; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { variables } from '../components/styles/variables';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    border-bottom: 1px solid ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-top: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    a {
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        padding: 1rem;
        border-right: solid 1px black;
        text-decoration: none;
        &:last-of-type {
            border-right: none;
        }
    }
    .selected {
        color: ${props => 
        variables[props.theme.theme].white};
        background-color: ${props =>
        variables[props.theme.theme].primary};
    }
`;

export default class ActivityNavigation extends Component {
    static propTypes = {

    }
    render() {
        return (
            <Container>
                <ReactTooltip />
                <NavLink activeClassName="selected" to="/collection" data-tip="View the words in your collection">Collection</NavLink>
                <NavLink activeClassName="selected" to="/review" data-tip="Review the words from your collection as interactive flashcards" >Review</NavLink>
                <NavLink activeClassName="selected" to="/test" data-tip="Test your skills by taking a vocabulary test with the words from your collection" >Test</NavLink>
            </Container>
        )
    }
}
