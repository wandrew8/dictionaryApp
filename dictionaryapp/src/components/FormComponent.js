import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from "react-tooltip";
import { variables } from '../components/styles/variables';

const Input = styled.div`
    display: grid;
    grid-template-columns: 1fr 25px;
    position: relative;
    input {
        display: block;
    }
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        color: lightgray;
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
        isLoading: true,
    }
    static propTypes = {
        wordCollection: PropTypes.array,
    }

    handleChange = (e, index) => {
        const answers = [...this.state.answers];
        answers[index] = e.target.value;
        this.setState({ answers })
    }

    checkAnswers = (e) => {
        e.preventDefault();
        const answersArray = []
        this.props.wordCollection.map(individualWord => {
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

    componentDidMount() {
        const { wordCollection } = this.props;
        const length = wordCollection.length > 5 ? 5 : wordCollection.length;
        this.getRandom(wordCollection, length);
    }

    getRandom = (arr, n) => {
        let result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            let x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        console.log(result)
        this.setState({ wordCollection: result, isLoading: false });
    }

    resetTest = () => {
        this.setState({ formSubmitted: false, totalScore: 0, isLoading: true });
        const { wordCollection } = this.props;
        const length = wordCollection.length > 5 ? 5 : wordCollection.length;
        this.getRandom(wordCollection, length);
    }

    render() {
        if (this.state.formSubmitted) {
            return (
                <Container>
                    <CongratulationsContainer>
                        <h1>Congratulations!</h1>
                        <p>Your Scored is: {this.state.totalScore} out of {this.state.wordCollection.length}</p>
                        <button onClick={this.resetTest}>Try Again!</button>
                    </CongratulationsContainer>
                </Container>
            )
        } else {
            return (
                <Container>
                    <StyledForm onSubmit={this.checkAnswers}>
                        <h2>Vocabulary Test</h2>
                        {this.state.isLoading ? <Loading /> : this.state.wordCollection.map((individualWord, index) => {
                            const {word, definition,type } = individualWord.data();
                            return (
                                <Input key={word}>
                                    <div>
                                        <label htmlFor={word}>{`${index + 1}. ${definition[0].toUpperCase() + definition.slice(1)}`}<span className="type">({type})</span></label>
                                        <input id={word} type="text" data-id={index} onChange={(e) => this.handleChange(e, index)} value={this.state.answers[index] || ''} name={word} className="guess"/>
                                    </div>
                                    <div className="icon">
                                        <ReactTooltip />
                                        <FontAwesomeIcon 
                                            data-tip={`This word begins with the letter: ${word[0].toUpperCase()}`}
                                            icon={faInfoCircle} 
                                            />
                                    </div>
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
