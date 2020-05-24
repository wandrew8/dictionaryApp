import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables } from './styles/variables';

const DefinitionContainer = styled.div`
    width: 100%;
    max-width: 500px;
    min-width: 250px;
    height: 100%;
    text-align: left;
    position: relative;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].light };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].light : variables[props.theme.theme].dark };
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
`;

export default class DefinitionCard extends Component {
    static propTypes = {
        def: PropTypes.object,
        word: PropTypes.string,
        pronunciation: PropTypes.string
    }
    render() {
        const { word, pronunciation } = this.props;
        const { type, definition, example, image_url } = this.props.def;
        return (
            <DefinitionContainer>
                <h2>{word}</h2>
                <p>/{pronunciation}/</p>
                <hr/>
                <small>{type}</small>
                <p>{definition}</p>
                <p>{example}</p>
            </DefinitionContainer>
        )
    }
}
