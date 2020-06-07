import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { SearchContainer, Image, StyledForm, StyledInput, Container } from './styles/components/searchBar';


export default function SearchBar(props) {
    const [ query, setQuery ] = useState('');
    const [ isWordSearched, setIsWordSearched ] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.handleSearch(query);
        setIsWordSearched(true);
        setQuery('');
    }

    const { theme } = props;
    return (
        <Container searched={isWordSearched}>
            <SearchContainer searched={isWordSearched} >
                <Image 
                    src={require(`../images/${theme}.svg`)} 
                    alt="" 
                    searched={isWordSearched}    
                    />
                <StyledForm 
                    searched={isWordSearched}
                    onSubmit={submitForm}>
                    <StyledInput 
                        name="query" 
                        type="text" 
                        placeholder="Search for a word"
                        value={query}
                        onChange={handleInputChange}/>
                    <Button inverse={true} type="submit">Search</Button>
                </StyledForm>
            </SearchContainer>
        </Container>
    )
    
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func,
    theme: PropTypes.string
}