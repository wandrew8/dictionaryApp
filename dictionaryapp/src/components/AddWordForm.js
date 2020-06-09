import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { Form } from './styles/components/addWordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const db = firebase.firestore();

export default function AddWordForm(props) {
    const formRef = useRef();
    const [ values, setValues ] = useState({});

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        }
    }, []);
    
    const handleClick = (e) => {
        if(!formRef.current.contains(e.target)) {
            props.closeForm();            
        }
    }

    const addWord = (e) => {
        e.preventDefault();
        const { uid, toggleForm, addWordToCollection } = props;
        const newWord = {
            dateAdded: new Date(),
            definition: values.definition,
            example: values.example,
            type: values.type,
            word: values.word,
        }
        db.collection('users')
            .doc(uid)
            .collection("wordCollection")
            .add(newWord);
        setValues({});
        toggleForm();
        addWordToCollection(uid);
    }

    const { showForm, toggleForm } = props;
    return (
        <Form>
            <div ref={formRef} className={showForm ? "showForm" : "hideForm"}>
                <div className="formContainer">
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        className="icon" 
                        onClick={toggleForm} />
                    <h2>Add a Word to Your Collection</h2>
                    <form>
                        <input 
                            value={values.word}
                            onChange={handleChange}
                            type="text" 
                            name="word" 
                            placeholder="Type the word you'd like to add..."
                            required
                            id="word"></input>
                        <select 
                            value={values.type} 
                            onChange={handleChange}
                            name="type" 
                            required
                            id="type">
                            <option>Select Part of Speech</option>
                            <option value="noun">Noun</option>
                            <option value="adjective">Adjective</option>
                            <option value="verb">Verb</option>
                            <option value="adverb">Adverb</option>
                            <option value="preposition">Preposition</option>
                            <option value="idiom">Idiom</option>
                        </select>
                        <textarea 
                            required
                            placeholder="Write the word's definition..."
                            value={values.definition}
                            onChange={handleChange}
                            name="definition" 
                            id="definition"></textarea>
                        <textarea 
                            name="example"
                            id="example"
                            placeholder="Write an example sentence (optional)"
                            onChange={handleChange}
                            value={values.example}></textarea>
                        <Button handleClick={addWord}>Add Word</Button>
                    </form>
                </div>
            </div>
        </Form>
    )
}

AddWordForm.propTypes = {
    showForm: PropTypes.bool,
    toggleForm: PropTypes.func,
    closeForm: PropTypes.func,
    uid: PropTypes.string,
    addWordToCollection: PropTypes.func,
}

