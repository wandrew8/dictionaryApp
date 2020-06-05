import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { variables } from './styles/variables';

const Form = styled.div`
    h2 {
        padding: 0;
        margin: 0;
    }
    .showForm {
        transition: 300ms ease-in-out;
        z-index: 100;
        transform: translateY(0);
        background-color: white;
        border: solid 1px black;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 500px;
        padding: 0;
        margin: 0;
        justify-content: center;
        align-items: center;
        display: flex;
        min-width: 300px;
        width: 100%;
    }
    .hideForm {
        transition: 300ms ease-in-out;
        z-index: 100;
        transform: translateY(0);
        background-color: white;
        border: solid 1px black;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
        max-width: 500px;
        padding: 0;
        margin: 0;
        opacity: 0;
        display: hidden;
        align-items: center;
        justify-content: center;
        display: flex;
        min-width: 300px;
        width: 100%;
    }
    .icon {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    form {
        text-align: left;
        label, input, select, textarea {
            display: block;
            margin: 1rem 0rem;
            width: 100%;
            font-family: ${variables.primaryFont}
        }
    }
    .formContainer {
        padding: 3rem 2rem;
    }
`;

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
        showForm: PropTypes.bool
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addWord = (e) => {
        e.preventDefault();
        console.log("hello")
    }

    render() {
        const { showForm, toggleForm } = this.props;
        return (
            <Form>
                <div className={showForm ? "showForm" : "hideForm"}>
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
