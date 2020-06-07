import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles/components/wordSetCard';
import PropTypes from 'prop-types';


export default function WordSetCard (props) {
    const { name, imageURL } = props.wordSet;
    return (
        <Container>
            <Link to={`/practice/${props.id}`}>
                <div className="card">
                    <h2>{name}</h2>
                    <img src={imageURL} alt={name} />
                </div>
            </Link>
        </Container>
    )
    
}

WordSetCard.propTypes = {
    wordSet: PropTypes.object
}
