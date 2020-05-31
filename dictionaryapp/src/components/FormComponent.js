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

const CongratulationsContainer = styled.div`
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    text-align: left;
    padding: 4rem 3rem;
    border-radius: 2rem;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
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
        transition: 150ms ease-in-out;
        border-bottom: solid 2px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        :focus {
            outline: none;
            transform: scale(1.05);
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
        answers: [],
        formSubmitted: false,
        totalScore: 0,
    }
    static propTypes = {
        userCollection: PropTypes.array,
    }

    handleChange = (e, index) => {
        const answers = [...this.state.answers];
        answers[index] = e.target.value;
        this.setState({ answers })
    }

    checkAnswers = (e) => {
        e.preventDefault();
        const answersArray = []
        this.props.userCollection.map(individualWord => {
            const { word } = individualWord.data();
            answersArray.push(word)
        });
        let totalCorrect = 0;
        answersArray.forEach((word, i) => {
            if(word === this.state.answers[i]){
                totalCorrect++;
            }
        })
        this.setState({ answers: [], totalScore: totalCorrect, formSubmitted: true });
    }

    resetTest = () => {
        this.setState({ formSubmitted: false, totalScore: 0 })
    }

    render() {
        if (this.state.formSubmitted) {
            return (
                <Container>
                    <CongratulationsContainer>
                        <h1>Congratulations!</h1>
                        <p>Your Scored is: {this.state.totalScore} out of {this.props.userCollection.length}</p>
                        <button onClick={this.resetTest}>Try Again!</button>
                    </CongratulationsContainer>
                </Container>
            )
        } else {
            return (
                <Container>
                    <StyledForm onSubmit={this.checkAnswers}>
                        <h2>Vocabulary Test</h2>
                        {this.props.userCollection.map((individualWord, index) => {
                            const {word, definition,type } = individualWord.data();
                            return (
                                <Input key={word}>
                                    <label htmlFor={word}>{`${index + 1}. ${definition[0].toUpperCase() + definition.slice(1)}`}<span className="type">({type})</span></label>
                                    <input id={word} type="text" data-id={index} onChange={(e) => this.handleChange(e, index)} value={this.state.answers[index] || ''} name={word} className="guess"/>
                                </Input>
                                 )
                        })}
                        <button>Submit</button>
                    </StyledForm>
                </Container>
            )
        }
    }
}
