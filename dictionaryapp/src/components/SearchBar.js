import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variables } from './styles/variables';

const SearchContainer = styled.div`
    position: ${props => props.searched ? "absolute" : "relative"};
    top: ${props => props.searched ? "50px" : "0px"};
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].backgroundLight : variables[props.theme.theme].backgroundDark };
    min-width: ${props => props.searched ? "100%" : "300px"};
    max-width: ${props => props.searched ? "100%" : "500px"};
    min-height: ${props => props.searched ? "50px" : "300px"};
    max-height: ${props => props.searched ? "50px" : "300px"};
    width: 90%;
    height: 90%;
    border-radius: ${props => props.searched ? "0rem" : "1rem"};;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 500ms linear;
    box-shadow: ${variables.boxShadow};
`;

const Image = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: ${props => props.searched ? "0rem" : "1rem"};;
`;

const StyledForm = styled.form`
    z-index: 10;
    display: flex;
    width: 80%;
    min-width: ${props => props.searched ? "75px" : "250px"};;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background-color: ${props =>
    props.searched ? "none" : variables[props.theme.theme].white };
`;

export default class SearchBar extends Component {
    state = {
        query: '',
        isWordSearched: false,
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
        this.setState({ query: '', isWordSearched: true })
    }

    render() {
        const { theme } = this.props;
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <SearchContainer searched={this.state.isWordSearched} >
                    <Image 
                        src={require(`../images/${theme}.svg`)} 
                        alt="" 
                        searched={this.state.isWordSearched}    
                        />
                    <StyledForm 
                        searched={this.state.isWordSearched}
                        onSubmit={this.submitForm}>
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
