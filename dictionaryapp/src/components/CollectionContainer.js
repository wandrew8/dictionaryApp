import React, { Component } from 'react';
import { variables } from '../components/styles/variables';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SingleDefinition = styled.li`
    display: grid;
    grid-template-columns: repeat( auto-fit, 300px minmax(300px, 1fr) );
    justify-content: center;
    grid-gap: 1rem;
    padding: 0rem 1rem;
    align-items: center;
    transition: 100ms ease-out;
    border-bottom: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    @media only screen and (max-width: ${variables.medium}) {
        grid-template-columns: 1fr;
    }
    .definition {
        text-align: left;
    }
    h2 {
        font-size: 2.5rem;
        margin: 0rem;
    }
    sup {
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }
    .example {
        font-style: italic;
        font-size: 0.9rem;
    }
    &:first-of-type {
        border-top: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
    &:last-of-type {
        border-bottom: none;
    }
    &:hover {
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }

`;

const Container = styled.div`
    width: 90%;
    max-width: 800px;
    min-width: 300px;
    min-height: 400px;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    font-family: ${variables.primaryFont};
    border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-radius: 1rem;
    
`;


export default class CollectionContainer extends Component {
    static propTypes = {
        collection: PropTypes.array,
        
    }
    render() {
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Container>
                    <h2>Your Word Collection</h2>
                    <ul style={{ padding: "0" }}>
                    {this.props.collection.map(word => {
                        return(
                            <SingleDefinition key={word.word} >
                                <div className="word">
                                    <h2>{word.word}<sup>{word.type}</sup></h2>
                                </div>
                                <div className="definition">
                                    <p>{word.definition}</p>
                                    <p className="example" >"{word.example}"</p>
                                </div>
                            </SingleDefinition>
                        )
                    })}
                    </ul>
                </Container>
            </div>
        )
    }
}
