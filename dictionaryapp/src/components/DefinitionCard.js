import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FirebaseAuth from '../components/FirebaseAuth';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { variables } from './styles/variables';
import ReactTooltip from "react-tooltip";
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
        box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 75px;
        grid-gap: 1rem;
        justify-content: center;
        align-items: center;
    }
    button {
        background: transparent;
        border: none;
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark }; 
        transition: 200ms ease-in-out;
        &:hover {
            transform: scale(1.3);
        }
        .icon {
            font-size: 2rem;
            color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark }; 
        }

    }
`;

export default class DefinitionCard extends Component {
    state = {
        showErrorModal: false,
        showCOnfirmationModal: false,
    }

    static propTypes = {
        def: PropTypes.object,
        word: PropTypes.string,
        pronunciation: PropTypes.string,
        isSignedIn: PropTypes.bool,
        theme: PropTypes.string
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
                this.setState({ showErrorModal: true })
        } else {
            console.log("You must be logged in to add a word to your collection")
        }

    }
    render() {
        const { word, pronunciation, theme } = this.props;
        const { type, definition, example, image_url } = this.props.def;
        return (
            <React.Fragment>
                <ReactTooltip />
                <DefinitionContainer>
                    <h2>{word}<sup>{type}</sup></h2>
                    <p>{pronunciation ? `/${pronunciation}/` : ""}</p>
                    <button data-tip="Add word to your collection" onClick={this.addToCollection}><FontAwesomeIcon icon={faBookmark} className="icon" /></button>
                    <hr/>
                    <div className="grid">
                        <div className="item">
                            <p>{definition}</p>
                            <p className="example">{example}</p>
                        </div>
                        <div className="item">
                            {image_url ? <img src={image_url} alt="word" /> : null }
                        </div>
                    </div>
                </DefinitionContainer>
                {this.state.showErrorModal ? 
                        <Modal heading="Please Create an Account to Add Words to Your Collection" theme={theme} >
                            <FirebaseAuth />
                        </Modal>
                        : null
                }
            </React.Fragment>
        )
    }
}
