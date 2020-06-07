import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles/components/wordSetCard';
import PropTypes from 'prop-types';


export default class WordSetCard extends Component {
    static propTypes = {
        wordSet: PropTypes.object
    }
    render() {
        const { name, imageURL } = this.props.wordSet;
        return (
            <Container>
                <Link to={`/practice/${this.props.id}`}>
                    <div className="card">
                        <h2>{name}</h2>
                        <img src={imageURL} alt={name} />
                    </div>
                </Link>
            </Container>
        )
    }
}
