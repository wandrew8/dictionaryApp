import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
    margin: 5rem 0rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    .wordDay {
        width: 90%;
        max-width: 800px;
        border: solid 1px blue;
        border-radius: 2rem;
    }
    .heading {
        background-color: black;
        border-radius: 2rem 2rem 0rem 0rem;
        color: white;
        text-align: center;
        padding: 1rem;
        h2 {
            font-size: 2.5rem;
            text-transform: uppercase;
            margin: 0;
            padding: 0;
        }
    }
    .body {
        text-align: left;
        h3 {
            font-size: 3rem;
            padding: 0rem 3rem;

        }
        .definition {
            padding: 0rem 3rem;
            font-size: 1.2rem;
        }
        .note {
            padding: 0rem 3rem 1rem 3rem;
            font-style: italic;
            font-size: 0.9rem;
        }
        sup {
            font-size: 1rem;
        }
        ul {
            list-style: none;
            text-align: center;
            padding: 0;
            li {
                padding: 1rem;
            }
            li:nth-child(odd) {
                background: rgba(0,0,0,0.1);
            }
            p {
                padding: 0rem 1rem;
            }
            blockquote {
                padding: 0;
                margin: 0;
            }
        }
        small {
            font-style: italic;
        }
    }
`;

export default function WordOfDay(props) {
    const { word, note, examples, publishDate } = props.word;
    const { text, partOfSpeech } = props.word.definitions[0];
    return (
        <Container>
            <div className="wordDay">
                <div className="heading">
                    <h2>Word of the Day</h2>
                    <p>{moment(publishDate).format('LL')}</p>
                </div>
                <div className="body">
                    <h3>{word}<sup>{partOfSpeech}</sup></h3>
                    <p className="definition">{text}</p>
                    <p className="note">({note})</p>
                    <ul>
                        {examples.map(example => {
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
}
