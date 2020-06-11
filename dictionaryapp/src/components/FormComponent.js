import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ShowResults from './ShowResults';
import Button from './Button';
import SettingsForm from './SettingsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faAngleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from "react-tooltip";
import { Input, CongratulationsContainer, StyledForm, Container } from './styles/components/formComponent';

export default class FormComponent extends Component {
    //Yeah, state definitely got out of hand in this component
    state = {
        answers: [],
        formSubmitted: false,
        totalScore: 0,
        isLoading: true,
        showResults: false,
        message: '',
        subtitle: '',
        testLength: 5,
        showForm: false,
        hideHints: false,
        showTimer: false,
        timerLength: 0,    
        isVisible: false,     
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

    openForm = () => {
        this.setState({ showForm: true});
    }

    closeForm = () => {
        this.setState({ showForm: false });
    }

    checkAnswers = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        const lowerCaseAnswers = this.state.answers.map(answer => answer ? answer.toLowerCase() : '');
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
        const score = total / this.state.testLength * 100; 
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
        this.getRandom(wordCollection, this.state.testLength);
    }

    getRandom = (arr, n) => {
        this.setState({ isVisible: false })
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
        this.setState({ wordCollection: result, isLoading: false }, () => {
            setTimeout(() => { this.setState({ isVisible: true })}, 300)
        });
    }

    resetTest = () => {
        const { wordCollection } = this.props;
        this.setState({ answers: [], formSubmitted: false, totalScore: 0, isLoading: true, showResults: false });
        this.getRandom(wordCollection, this.state.testLength);
    }

    changeSettings = (values) => {
        this.setState({ testLength: values.testLength, hideHints: values.hideHints, showTimer: values.showTimer, timerLength: values.timerLength }, () => {
            this.resetTest();
        });
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
                        <ShowResults showResults={this.state.showResults} wordCollection={this.state.wordCollection} answers={this.state.answers} />
                    </CongratulationsContainer>
                </Container>
            )
        } else {
            return (
                <React.Fragment>
                    {this.state.showForm ? <SettingsForm 
                        changeSettings={this.changeSettings}
                        openForm={this.openForm} 
                        showForm={this.state.showForm} 
                        wordCount={this.props.wordCollection}
                        closeForm={this.closeForm} /> : null}
                    <Container>
                        <StyledForm onSubmit={this.checkAnswers}>
                        <FontAwesomeIcon 
                            data-tip="Change the test settings" 
                            icon={faCog} 
                            className="settings" 
                            onClick={this.openForm} />
                            <h2>Vocabulary Test</h2>

                            {this.state.isLoading ? <Loading /> : this.state.wordCollection.map((individualWord, index) => {
                                const {word, definition,type } = individualWord.data();
                                return (
                                    <React.Fragment key={word}>
                                        <ReactTooltip />
                                        <Input index={index} isVisible={this.state.isVisible}>
                                            <div>
                                                <label htmlFor={word}>{`${index + 1}. ${definition[0].toUpperCase() + definition.slice(1)}`}<span className="type">({type})</span></label>
                                                <input id={word} type="text" data-id={index} onChange={(e) => this.handleChange(e, index)} value={this.state.answers[index] || ''} name={word} className="guess"/>
                                            </div>
                                            {this.state.hideHints ? null : <div className="icon">
                                                <FontAwesomeIcon 
                                                    data-tip={`This word begins with the letter: ${word[0].toUpperCase()}`}
                                                    icon={faInfoCircle} 
                                                    />
                                            </div>}
                                        </Input>
                                    </React.Fragment>
                                    )
                            })}
                            <Button>Submit</Button>
                        </StyledForm>
                    </Container>
                </React.Fragment>
            )
        }
    }
}
