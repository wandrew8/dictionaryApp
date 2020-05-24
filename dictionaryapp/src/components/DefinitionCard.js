import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables } from './styles/variables';
import firebase from 'firebase';

const db = firebase.firestore();

const DefinitionContainer = styled.div`
    width: 100%;
    max-width: 500px;
    min-width: 250px;
    height: 100%;
    text-align: left;
    position: relative;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].light };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].light : variables[props.theme.theme].dark };
    padding: 1.5rem;
    border: ${props =>
    props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].light}` : `solid 1px ${variables[props.theme.theme].dark}` };
    margin: 1rem;
    border-radius: 1rem;
    transition: 200ms ease-in-out;
    & img {
        position: absolute;
        top: 1rem;
        right: 1rem;
        height: 75px;
        width: 75px;
        border-radius: 50%;
        border: ${props =>
        props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].light}` : `solid 1px ${variables[props.theme.theme].dark}` };
    }
    & h2 {
        font-size: 2rem;
        padding: 0rem;
        margin: 0rem;
    }
    & hr {
        text-align: center;
    }
    & sup {
        font-size: 0.8rem;
        color: grey;
        margin-left: 0.5rem;
    }
    & .example {
        font-style: italic;
        font-size: 0.9rem;
    }
    &:hover {
        transform: translateY(-2px);
    }
`;

export default class DefinitionCard extends Component {
    static propTypes = {
        def: PropTypes.object,
        word: PropTypes.string,
        pronunciation: PropTypes.string,
        isSignedIn: PropTypes.bool
    }

    addToCollection = () => {
        if(this.props.isSignedIn) {
            const uid = firebase.auth().currentUser.uid;
            const { word, pronunciation } = this.props;
            const { type, definition, example, image_url } = this.props.def;
                db.collection('users')
                .doc(uid)
                .collection("wordCollection")
                    .add({
                        word,
                        pronunciation,
                        type,
                        definition,
                        example, 
                        image_url,
                        dateAdded: new Date()
                    })
                console.log("You have successfully added the word " + word + " to your collection!")
        } else {
            console.log("You must be logged in to add a word to your collection")
        }

    }
    render() {
        const { word, pronunciation } = this.props;
        const { type, definition, example, image_url } = this.props.def;
        return (
            <DefinitionContainer>
                {image_url ? <img src={image_url} alt="word" /> : null }
                <h2>{word}<sup>{type}</sup></h2>
                <p>{pronunciation ? `/${pronunciation}/` : ""}</p>
                <hr/>
                <p>{definition}</p>
                <p className="example">{example}</p>
                <button onClick={this.addToCollection}>Save Word to Review Collection</button>
            </DefinitionContainer>
        )
    }
}
