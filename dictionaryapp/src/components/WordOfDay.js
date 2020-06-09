import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container } from './styles/components/wordOfDay';

export default function WordOfDay(props) {
    const { word, note, examples } = props.word;
    const { text, partOfSpeech } = props.word.definitions[0];    
    return (
        <Container nightMode={props.nightMode}>
            <div className="wordDay">
                <div className="top">
                    <div className="heading">
                        <div>
                            <h2>Word of the Day</h2>
                            <p>{moment(Date.now()).format('MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div className="body">
                        <h3>{word}<sup>{partOfSpeech}</sup></h3>
                        <p className="definition">{text}</p>
                        <p className="note">({note})</p>
                    </div>
                </div>
                <div className="bottom">
                    <ul>
                        {examples.filter((word, i) => i < 3).map(example => {
                            return (
                                <li key={example.id}>
                                <blockquote cite={example.url}>
                                    <p>{example.text}</p>
                                    <small>- {example.title}</small>
                                </blockquote>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </Container>
    )
}

WordOfDay.propTypes = {
    word: PropTypes.object,
    nightMode: PropTypes.string
}
