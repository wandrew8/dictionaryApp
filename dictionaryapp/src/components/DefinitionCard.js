import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseAuth from '../components/FirebaseAuth';
import Modal from '../components/Modal';
import { DefinitionContainer } from './styles/components/definitionCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip";
import firebase from 'firebase';

const db = firebase.firestore();

export default function DefinitionCard(props) {
    const [ showErrorModal, setShowErrorModal ] = useState(false);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);

    const closeModal = () => {
        setShowErrorModal(false);
        setShowConfirmationModal(false);
    }

    const addToCollection = () => {
        if(props.isSignedIn) {
            const uid = firebase.auth().currentUser.uid;
            const { word, pronunciation } = props;
            const { type, definition, example, image_url } = props.def;
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
            setShowConfirmationModal(true);
        } else {
            setShowErrorModal(true);
        }
    }

    const { word, pronunciation } = props;
    const { type, definition, example, image_url } = props.def;
    return (
        <React.Fragment>
            <ReactTooltip />
            <DefinitionContainer>
                <div className="cardHeading">
                    <h2>{word}<sup>{type}</sup></h2>
                    {image_url ? <img src={image_url} alt="word" /> : null }
                    <p>{pronunciation ? `/${pronunciation}/` : ""}</p>
                    <button data-tip="Add word to your collection" onClick={addToCollection}><FontAwesomeIcon icon={faBookmark} className="icon" /></button>
                </div>
                <hr/>
                <p>{definition}</p>
                <p className="example">{example}</p>
            </DefinitionContainer>
            {showErrorModal ? 
                    <Modal 
                        showModal={showErrorModal}
                        showClose={true}
                        closeModal={closeModal}
                        heading="Please Create an Account to Add Words to Your Collection" 
                            >
                        <FirebaseAuth />
                    </Modal>
                    : null
            }
            {showConfirmationModal ? 
                    <Modal 
                        showModal={showConfirmationModal}
                        showClose={true}
                        closeModal={closeModal}
                        heading="Word Added to your Collection" 
                            >
                    </Modal>
                    : null
            }
        </React.Fragment>
    )
}

DefinitionCard.propTypes = {
    def: PropTypes.object,
    word: PropTypes.string,
    pronunciation: PropTypes.string,
    isSignedIn: PropTypes.bool,
    theme: PropTypes.string
}