import React, { Component } from 'react';
import Button from '../components/Button';
import { Form } from './styles/components/addWordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const db = firebase.firestore();

export default class AddWordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            definition: '',
            example: '',
            type: '',
            word: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.addWord = this.addWord.bind(this);
    }
    
    static propTypes = {
        showForm: PropTypes.bool,
        toggleForm: PropTypes.func,
        closeForm: PropTypes.func,
        uid: PropTypes.string,
        addWordToCollection: PropTypes.func,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if(!this.node.contains(e.target)) {
            this.props.closeForm();
        }
    }

    addWord = (e) => {
        e.preventDefault();
        const newWord = {
            dateAdded: new Date(),
            definition: this.state.definition,
            example: this.state.example,
            type: this.state.type,
            word: this.state.word,
        }
        console.log(newWord);
        db.collection('users')
            .doc(this.props.uid)
            .collection("wordCollection")
            .add(newWord);
        this.setState({ definition: '', example: '', type: '', word: '' });
        this.props.toggleForm();
        this.props.addWordToCollection(this.props.uid);
    }

    render() {
        const { showForm, toggleForm } = this.props;
        return (
            <Form>
                <div ref={node => this.node = node} className={showForm ? "showForm" : "hideForm"}>
                    <div className="formContainer">
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            className="icon" 
                            onClick={toggleForm} />
                        <h2>Add a Word to Your Collection</h2>
                        <form>
                            <input 
                                value={this.state.word}
                                onChange={(e) => this.handleChange(e)}
                                type="text" 
                                name="word" 
                                placeholder="Type the word you'd like to add..."
                                required
                                id="word"></input>
                            <select 
                                value={this.state.type} 
                                onChange={(e) => this.handleChange(e)}
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
                                value={this.state.definition}
                                onChange={(e) => this.handleChange(e)}
                                name="definition" 
                                id="definition"></textarea>
                            <textarea 
                                name="example"
                                id="example"
                                placeholder="Write an example sentence (optional)"
                                onChange={(e) => this.handleChange(e)}
                                value={this.state.example}></textarea>
                            <Button handleClick={(e) => this.addWord(e)}>Add Word</Button>
                        </form>
                    </div>
                </div>
            </Form>
        )
    }
}
