import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
    .card {
        border: solid 1px black;
        border-radius: 1rem;
    }
`;

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
