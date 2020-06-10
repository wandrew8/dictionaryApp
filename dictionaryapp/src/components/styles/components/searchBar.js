import styled from 'styled-components';
import { variables } from '../variables';

export const Container = styled.div`
    position: ${props => props.searched ? "absolute" : "relative"};
    top: ${props => props.searched ? "-50px" : "0"};
    left: ${props => props.searched ? "0px" : "0"};
    max-width: ${props => props.searched ? "100%" : "500px"};
    padding: 0;
    margin: 0rem auto;
    margin-bottom: ${props => props.searched ? "2rem" : "0rem"};
    justify-content: center;
    display: flex;
    min-width: 300px;
    width: 100%;
`;

export const Section = styled.section`
    min-height: ${props => props.searched ? "0px" : "calc(100vh - 100px)"};
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.searched ? "0rem" : "2rem 0rem"};
    transform: ${props => props.searched ? "translate(0px, 0px)" : "none"};
    h1 {
        font-size: 2.5rem;
        text-transform: uppercase;
        @media only screen and (max-width: ${variables.small}) {
            font-size: 2rem;
            margin: 0rem 1rem 2rem 1rem;
        }
    }
    .subtext {
        margin: 3rem 2rem;
    }
`;


export const SearchContainer = styled.div`
    position: ${props => props.searched ? "absolute" : "relative"};
    top: 0px;
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
    transition: 300ms ease-in;
    box-shadow: ${variables.boxShadow};
`;

export const Image = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: ${props => props.searched ? "0rem" : "1rem"};;
`;

export const StyledForm = styled.form`
    z-index: 10;
    display: flex;
    width: 80%;
    min-width: ${props => props.searched ? "75px" : "250px"};;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    min-height: ${props => props.searched ? "50px" : "200px"};
    max-height: ${props => props.searched ? "50px" : "200px"};
    background-color: ${props =>
    props.searched ? "none" : variables[props.theme.theme].white };
    
`;

export const StyledInput = styled.input`
    margin-right: 0.5rem;
    height: 35px;
    font-family: ${variables.primaryFont};
    padding-left: 0.5rem;
    width: 200px;
    color: ${props => variables[props.theme.theme].dark};
    background: ${props => variables[props.theme.theme].white};
    border-radius: 0.5rem;
    border: solid 2px ${props => variables[props.theme.theme].primary};
    @media only screen and (max-width: ${variables.small}) {
       width: 130px;
    }
`;