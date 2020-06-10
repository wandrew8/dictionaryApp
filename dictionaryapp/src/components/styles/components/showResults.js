import styled from 'styled-components';

export const Container = styled.div`
    height: ${props => props.showResults ? "100%" : "0px"};
    opacity: ${props => props.showResults ? "1" : "0"};
    visibility: ${props => props.showResults ? "visible" : "hidden"};
    transition: 400ms ease-in;
    text-align: left;
    margin: 0px;
    padding: ${props => props.showResults ? "2rem 3rem" : "0rem 3rem"};
    .resultsAnswer {
        height: ${props => props.showResults ? "100%" : "0px"}; 
        opacity: ${props => props.showResults ? "1" : "0"};
        display: ${props => props.showResults ? "block" : "none"};
        visibility: ${props => props.showResults ? "visible" : "hidden"};  
    }
    .answers {
        padding: 0rem 2rem;
    }
    .fade {
        color: lightgray;
    }
    .iconGood {
        color: green;
    }
    .iconBad {
        color: red;
    }
`;