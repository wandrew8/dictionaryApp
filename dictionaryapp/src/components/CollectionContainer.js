import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SingleDefinition, Container } from './styles/components/collectionContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddWordForm from '../components/AddWordForm';
import ReactTooltip from "react-tooltip";


export default class CollectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        }
        this.toggleForm = this.toggleForm.bind(this);
    }
    
    static propTypes = {
        collection: PropTypes.array,
        removeItem: PropTypes.func,
        showRemove: PropTypes.bool,
        uid: PropTypes.string,
        showAddWordForm: PropTypes.bool,
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    closeForm = () => {
        this.setState({ showForm: false });
    }

    render() {
        return (
            <div style={{ marginBottom: "5rem", width: "100%", display: "flex", justifyContent: "center" }}>
                {this.props.showAddWordForm ? <AddWordForm 
                    toggleForm={this.toggleForm} 
                    closeForm={this.closeForm}
                    uid={this.props.uid}
                    showForm={this.state.showForm} /> : null}
                <Container>
                    <ReactTooltip />
                    <h2>Vocabulary List</h2>
                    {this.props.showAddWordForm ? <FontAwesomeIcon 
                        onClick={() => this.setState({ showForm: !this.state.showForm })}
                        data-tip="Add new word to your collection" 
                        className="addicon" 
                        icon={faPlusSquare} /> : null }
                    <ul style={{ padding: "0" }}>
                    {this.props.collection.map(word => {
                        return(
                            <SingleDefinition key={word.data().word} >
                                <div className="word">
                                    <h2>{word.data().word}<sup>{word.data().type}</sup></h2>
                                </div>
                                <div className="definition">
                                    <p>{word.data().definition}</p>
                                    <p className="example" >{word.data().example && `"${word.data().example}"`}</p>
                                </div>
                                {this.props.showRemove ? <div 
                                    onClick={this.props.removeItem.bind(this, word.id)}
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
}
