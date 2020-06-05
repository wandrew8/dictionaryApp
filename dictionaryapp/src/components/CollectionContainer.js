import React, { Component } from 'react';
import { variables } from '../components/styles/variables';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddWordForm from '../components/AddWordForm';
import ReactTooltip from "react-tooltip";
import styled from 'styled-components';

const SingleDefinition = styled.li`
    display: grid;
    position: relative;
    grid-template-columns: repeat( auto-fit, 300px minmax(300px, 1fr) 50px );
    justify-content: center;
    grid-gap: 1rem;
    padding: 0.25rem 1rem;
    align-items: center;
    transition: 100ms ease-out;
    border-bottom: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    @media only screen and (max-width: ${variables.medium}) {
        grid-template-columns: 1fr;
        .word {
            text-align: left;
        }
        .remove {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
    .definition {
        text-align: left;
    }
    .icon {
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        transition: 200ms ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.3);
        }
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
    &:nth-child(odd) {
        background: ${props =>
            props.theme.nightMode === "light" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
    }

`;

const Container = styled.div`
    width: 90%;
    max-width: 800px;
    min-width: 300px;
    min-height: 400px;
    position: relative;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    font-family: ${variables.primaryFont};
    border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-radius: 1rem;
    h2 {
        margin-bottom: 1.5rem;

    }
    .addicon {
        position: absolute;
        top: 1rem;
        right: 2rem;
        font-size: 2rem;
        color: lightgray;
        cursor: pointer;
    }
`;


export default class CollectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    
    static propTypes = {
        collection: PropTypes.array,
        removeItem: PropTypes.func,
        showRemove: PropTypes.bool
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    render() {
        return (
            <div style={{ marginBottom: "5rem", width: "100%", display: "flex", justifyContent: "center" }}>
                <AddWordForm 
                    toggleForm={this.toggleForm} 
                    showForm={this.state.showForm} /> 
                <Container>
                    <ReactTooltip />
                    <h2>Vocabulary List</h2>
                    <FontAwesomeIcon 
                        onClick={() => this.setState({ showForm: !this.state.showForm })}
                        data-tip="Add new word to your collection" 
                        className="addicon" 
                        icon={faPlusSquare} />
                    <ul style={{ padding: "0" }}>
                    {this.props.collection.map(word => {
                        return(
                            <SingleDefinition key={word.data().word} >
                                <div className="word">
                                    <h2>{word.data().word}<sup>{word.data().type}</sup></h2>
                                </div>
                                <div className="definition">
                                    <p>{word.data().definition}</p>
                                    <p className="example" >{word.data().example && `"${word.data().example}"`}</p>
                                </div>
                                {this.props.showRemove ? <div 
                                    onClick={this.props.removeItem.bind(this, word.id)}
                                    data-tip="Remove word from your collection" 
                                    className="remove">
                                    <FontAwesomeIcon className="icon" icon={faTrash} />
                                </div> : null }
                            </SingleDefinition>
                        )
                    })}
                    </ul>
                </Container>
            </div>
        )
    }
}
