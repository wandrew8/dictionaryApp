import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FirebaseAuth from '../components/FirebaseAuth';
import Modal from '../components/Modal';
import { DefinitionContainer } from './styles/components/definitionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip";
import firebase from 'firebase';

const db = firebase.firestore();

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
        } else {
            console.log("You must be logged in to add a word to your collection")
            this.setState({ showErrorModal: true })

        }

    }
    render() {
        const { word, pronunciation, theme } = this.props;
        const { type, definition, example, image_url } = this.props.def;
        return (
            <React.Fragment>
                <ReactTooltip />
                <DefinitionContainer>
                    <div className="cardHeading">
                        <h2>{word}<sup>{type}</sup></h2>
                        {image_url ? <img src={image_url} alt="word" /> : null }
                        <p>{pronunciation ? `/${pronunciation}/` : ""}</p>
                        <button data-tip="Add word to your collection" onClick={this.addToCollection}><FontAwesomeIcon icon={faBookmark} className="icon" /></button>
                    </div>
                    <hr/>
                    <p>{definition}</p>
                    <p className="example">{example}</p>
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
