import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    text-align: left;
    .answers {
        padding: 0rem 2rem;
    }
    .fade {
        color: lightgray;
    }
    .iconGood {
        color: green;
    }
    .iconBad {
        color: red;
    }
`;

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
                   if (word.toLowerCase() === answers[i].toLowerCase()) {
                       return (
                           <div>
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
                            <div>
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
