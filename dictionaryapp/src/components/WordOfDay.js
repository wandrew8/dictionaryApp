import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { variables } from './styles/variables';

const Container = styled.div`
    margin: 0rem 0rem 5rem 0rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    .wordDay {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 90%;
        max-width: 1200px;
    }
    .heading {
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-radius: 2rem 2rem 0rem 0rem;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        text-align: center;
        padding: 1rem;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        h2 {
            font-size: 2.5rem;
            text-transform: uppercase;
            margin: 0;
            padding: 0;
        }
    }
    .top {
        height: calc(100% - 120px);
    }
    .body {
        border: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-right: none;
        border-radius: 0rem 0rem 0rem 2rem;
        height: 100%;
    }
    .bottom {
        border: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-radius: 0rem 2rem 2rem 0rem;
        margin-top: 120px;
    }
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
        margin: 0;
        li {
            padding: 1rem;
        }
        li:first-of-type {
            border-radius: 0rem 2rem 0rem 0rem;
        }
        li:nth-child(odd) {
            background: ${props =>
            props.theme.nightMode === "light" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        }
        li:last-of-type {
            border-radius: 0rem 0rem 2rem 0rem;
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
    @media only screen and (max-width: ${variables.large}) {
        .wordDay {
        grid-template-columns: 1fr;
        width: 90%;
        max-width: 1200px;
        }
        .top {
        height: 100%;
        }
        .body {
            border: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
            border-bottom: none;
            height: 100%;
            border-radius: 0rem;
        }
        .bottom {
            border: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
            border-radius: 0rem 0rem 2rem 2rem;
            margin-top: 0px;
        }
        ul {
            li:first-of-type {
                border-radius: 0rem;
            }
            li:last-of-type {
                border-radius: 0rem 0rem 2rem 2rem;
            }
        }

    }
`;

export default function WordOfDay(props) {
    const { word, note, examples, pdd } = props.word;
    const { text, partOfSpeech } = props.word.definitions[0];
    return (
        <Container>
            <div className="wordDay">
                <div className="top">
                    <div className="heading">
                        <div>
                            <h2>Word of the Day</h2>
                            <p>{moment(pdd).format('MMMM do YYYY')}</p>
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
}
