import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SingleDefinition, Container } from './styles/components/collectionContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddWordForm from '../components/AddWordForm';
import ReactTooltip from "react-tooltip";


export default function CollectionContainer(props) {
    const [ showForm, setShowForm ] = useState(false);
    const [ wordCollection, setWordCollection ] = useState([]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const { getUserCollection, collection, removeItem, showRemove, uid, showAddWordForm } = props;
    return (
        <div style={{ marginBottom: "5rem", width: "100%", display: "flex", justifyContent: "center" }}>
            {showAddWordForm ? <AddWordForm 
                toggleForm={toggleForm} 
                closeForm={closeForm}
                uid={uid}
                addWordToCollection={getUserCollection}
                showForm={showForm} /> : null}
            <Container>
                <ReactTooltip />
                <h2>Vocabulary List</h2>
                {showAddWordForm ? <FontAwesomeIcon 
                    onClick={() => setShowForm(!showForm)}
                    data-tip="Add new word to your collection" 
                    className="addicon" 
                    icon={faPlusSquare} /> : null }
                <ul style={{ padding: "0" }}>
                {collection.map(word => {
                    return(
                        <SingleDefinition key={word.data().word} >
                            <div className="word">
                                <h2>{word.data().word}<sup>{word.data().type}</sup></h2>
                            </div>
                            <div className="definition">
                                <p>{word.data().definition}</p>
                                <p className="example" >{word.data().example && `"${word.data().example}"`}</p>
                            </div>
                            {showRemove ? <div 
                                onClick={removeItem.bind(this, word.id)}
                                data-tip="Remove word from your collection" 
                                className="remove">
                                <FontAwesomeIcon className="icon" icon={faTrash} />
                            </div> : null }
                        </SingleDefinition>
                    )
                })}
                </ul>
            </Container>
        </div>
    )
    
}

CollectionContainer.propTypes = {
    collection: PropTypes.array,
    removeItem: PropTypes.func,
    showRemove: PropTypes.bool,
    uid: PropTypes.string,
    showAddWordForm: PropTypes.bool,
    getUserCollection: PropTypes.func,
}