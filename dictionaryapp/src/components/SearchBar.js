import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { SearchContainer, Image, StyledForm, StyledInput } from './styles/components/searchBar';



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
                        <StyledInput 
                            name="query" 
                            type="text" 
                            placeholder="Search for a word"
                            value={this.state.query}
                            onChange={this.handleInputChange}/>
                        <Button type="submit">Search</Button>
                    </StyledForm>
                </SearchContainer>
            </div>
        )
    }
}
