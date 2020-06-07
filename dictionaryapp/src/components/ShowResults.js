import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from './styles/components/showResults';


export default class ShowResults extends Component {
    static propTypes = {
       wordCollection: PropTypes.array,
       answers: PropTypes.array,
    }

    render() {
        const { wordCollection, answers } = this.props;
        return (
            <Container>
               { wordCollection.map((individualWord, i) => {
                   const { word, definition, type } = individualWord.data();
                   const answer = answers[i] ? answers[i].toLowerCase() : answers[i];
                   if (word.toLowerCase() === answer) {
                       return (
                           <div key={i}>
                                <p>{i + 1}. {definition} ({type})</p>
                                <div className="answers">
                                    <p className="fade">Correct</p>
                                    <p><FontAwesomeIcon className="iconGood" icon={faCheckCircle} /> {word}</p>
                                </div>
                                <hr/>
                           </div>
                       )
                   } else {
                        return (
                            <div key={i}>
                                <p>{i + 1}. {definition} ({type})</p>
                                <div className="answers">
                                    <p className="fade">Incorrect</p>
                                    <p><FontAwesomeIcon className="iconBad" icon={faTimesCircle} /> {answers[i]}</p>
                                    <p className="fade">Correct Answer</p>
                                    <p>{word}</p>
                                </div>
                                <hr/>
                            </div>
                        )
                   }
               })}
            </Container>
        )
    }
}
