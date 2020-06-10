import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { SearchContainer, Section, Image, StyledForm, StyledInput, Container } from './styles/components/searchBar';


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
        <Section searched={isWordSearched}>
            <div>
                {isWordSearched ? null : <div>
                    <h1 className="title">Dictionary Search</h1>
                </div>}
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
                                required
                                onChange={handleInputChange}/>
                            <Button inverse={true} type="submit">Search</Button>
                        </StyledForm>
                    </SearchContainer>
                </Container>
                {isWordSearched ? null : <div className="subtext">
                    <p>Add words to your collection and review them as interactive flashcards</p>
                    <p>Test your vocabulary skills by taking vocabulary tests</p>
                </div>}
            </div>
        </Section>
    )
    
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func,
    theme: PropTypes.string
}