import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './Loading';
import ShowResults from './ShowResults';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
    border-radius: 2rem;
    text-align: center;
    position: relative;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    border: solid 2px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].white };
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    .iconContainer {
        display: block;
        text-align: center;
        color: lightgray;
        cursor: pointer;
        margin-top: 2rem;
    }
    .flexContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 2rem 0rem 0rem 2rem;

        }
    }
    .message {
        padding: 2rem;
    }
    .bottom {
        padding: 2rem 3rem;
    }
`;

const StyledForm = styled.form`
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    text-align: left;
    padding: 4rem 3rem;
    border-radius: 2rem;
    border: solid 2px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].white };
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
        showResults: false,
        message: '',
        subtitle: ''
    }
    static propTypes = {
        wordCollection: PropTypes.array,
        theme: PropTypes.string,
    }

    handleChange = (e, index) => {
        const answers = [...this.state.answers];
        answers[index] = e.target.value;
        this.setState({ answers })
    }

    checkAnswers = (e) => {
        const lowerCaseAnswers = this.state.answers.map(answer => answer.toLowerCase());
        console.log(lowerCaseAnswers);
        console.log(this.state.answers)
        e.preventDefault();
        const answersArray = []
        this.state.wordCollection.map(individualWord => {
            const { word } = individualWord.data();
            answersArray.push(word)
        });
        let totalCorrect = 0;
        answersArray.forEach((word, i) => {
            if(word.toLowerCase() === lowerCaseAnswers[i]){
                totalCorrect++;
            }
        })
        this.setState({ totalScore: totalCorrect }, () => {
            this.getMessage(totalCorrect);
        });

    }

    getMessage = (total) => {
        const score = total / this.props.wordCollection.length * 100; 
        if(score === 100) {
            this.setState({ formSubmitted: true, message: "Perfect Score!", subtitle: 'You must be a genius' })
        } else if (score > 75) {
            this.setState({ formSubmitted: true, message: "Congratulations!", subtitle: 'You have nearly mastered these words' })
        } else if (score > 50) {
            this.setState({ formSubmitted: true, message: "Good Effort", subtitle: 'With more practice you can do better' })
        } else if (score > 25) {
            this.setState({ formSubmitted: true, message: "Good Try!", subtitle: 'But you need to study some more' })
        } else if (score > 0) {
            this.setState({ formSubmitted: true, message: "Oh No!", subtitle: 'You need to review a few more times' })
        } else {
            this.setState({ formSubmitted: true, message: "Oh No!", subtitle: "You didn't get any correct!" })
        }
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
        this.setState({ answers: [], formSubmitted: false, totalScore: 0, isLoading: true, showResults: false });
        const { wordCollection } = this.props;
        const length = wordCollection.length > 5 ? 5 : wordCollection.length;
        this.getRandom(wordCollection, length);
    }

    render() {
        const { theme } = this.props;
        if (this.state.formSubmitted) {
            return (
                <Container>
                    <CongratulationsContainer>
                        <div className="flexContainer">
                            <img src={require(`../images/${theme}.svg`)} />
                            <div className="message">
                                <h1>{this.state.message}</h1>
                                <p>{this.state.subtitle}</p>
                                <p>Your Scored is: {this.state.totalScore} out of {this.state.wordCollection.length}</p>
                                <Button handleClick={this.resetTest}>Try Again!</Button>
                                <div 
                                    onClick={() => this.setState({ showResults: !this.state.showResults })}
                                    className="iconContainer">
                                    <p>{this.state.showResults ? "Hide Results" : "Show Results"}</p>
                                    <FontAwesomeIcon 
                                        icon={faAngleDown}
                                    />
                                </div>
                            </div>
                        </div>
                        {this.state.showResults ? <div className="bottom"><ShowResults wordCollection={this.state.wordCollection} answers={this.state.answers} /></div> : null}
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
                        <Button>Submit</Button>
                    </StyledForm>
                </Container>
            )
        }
    }
}
