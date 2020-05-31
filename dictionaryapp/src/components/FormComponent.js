import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables } from '../components/styles/variables';
import firebase from 'firebase/app';
import { ContentContainer } from './styles/components/modal';

const Input = styled.div`
    display: block;
    input {
        display: block;
    }
`;

const StyledForm = styled.form`
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    text-align: left;
    padding: 4rem 3rem;
    border-radius: 2rem;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    input, label {
        display: block;
        margin: 1rem 0rem;
        line-height: 1.8rem;
        font-size: 1.2rem;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
    input {
        border: none;
        transition: 200ms ease-in-out;
        border-bottom: solid 2px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        :focus {
            outline: none;
            border-bottom: solid 2px yellow;
        }
    }
    span {
        color: lightgray;
        font-size: 0.8rem;
        padding-left: 1rem;
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
`;

export default class FormComponent extends Component {
    state = {

    }
    static propTypes = {
        userCollection: PropTypes.array,
    }

    render() {
        return (
            <Container>
                <StyledForm>
                    <h2>Vocabulary Test</h2>
                    {this.props.userCollection.map((individualWord, index) => {
                        const {word, definition,type } = individualWord.data();
                        return (
                            <Input key={word}>
                                <label htmlFor={word}>{`${index + 1}. ${definition[0].toUpperCase() + definition.slice(1)}`}<span className="type">({type})</span></label>
                                <input id={word} type="text" name={word} />
                            </Input>
                        )
                    })}
                    <button>Submit</button>
                </StyledForm>
            </Container>
        )
    }
}
