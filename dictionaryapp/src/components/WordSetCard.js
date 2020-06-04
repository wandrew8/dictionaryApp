import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { variables } from './styles/variables';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    a {
        text-decoration: none;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
    .card {
        border: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        min-height: 250px;
        transition: 100ms ease-out;
    &:hover {
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }
    }
    h2 {
        font-size: 1.5rem;
        padding: 0.5rem 0rem;
        opacity: 0.9;
        margin: 0;
        z-index: 9;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white }; 
    }
    img {
        position: absolute;
        width: 200px;
        height: 200px;
        margin: auto;
        position: absolute;
        border-radius: 50%;
        top: 50%; left: 50%;
        -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
    }
    
`;

export default class WordSetCard extends Component {
    static propTypes = {
        wordSet: PropTypes.object
    }
    render() {
        const { name, imageURL } = this.props.wordSet;
        return (
            <Container>
                <Link to={`/practice/${this.props.id}`}>
                    <div className="card">
                        <h2>{name}</h2>
                        <img src={imageURL} alt={name} />
                    </div>
                </Link>
            </Container>
        )
    }
}
