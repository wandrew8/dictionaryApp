import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables } from './styles/variables';

const SearchContainer = styled.div`
    position: relative;
    min-height: 300px;
    min-width: 300px;
    max-height: 400px;
    max-width: 500px;
    width: 90%;
    height: 90%;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].backgroundLight : variables[props.theme.theme].backgroundDark };
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${variables.boxShadow};
`;

const Image = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
`;

const StyledForm = styled.form`
    z-index: 10;
    display: flex;
    width: 80%;
    min-width: 250px;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
`;

export default class SearchBar extends Component {
    state = {
        query: ''
    }

    static propTypes = {
        handleSearch: PropTypes.func,
        theme: PropTypes.string
    }

    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.handleSearch(this.state.query);
        this.setState({ query: '' })
    }

    render() {
        const { theme } = this.props;
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
            <SearchContainer>
                <Image src={require(`../images/${theme}.svg`)} alt="" />
                <StyledForm onSubmit={this.submitForm}>
                    <input 
                        name="query" 
                        type="text" 
                        placeholder="Search for a word"
                        value={this.state.query}
                        onChange={this.handleInputChange}/>
                    <button type="submit">Search</button>
                </StyledForm>
            </SearchContainer>
            </div>
        )
    }
}
