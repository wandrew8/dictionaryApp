import { variables } from '../variables';
import styled from 'styled-components';


export const StyledFooter = styled.footer`
    background-color: ${props =>
    variables[props.theme.theme].primary };
    color: ${props =>
    variables[props.theme.theme].white };
    width: 100vw;
    position: relative;
    .mainContent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    padding: 3rem;
    @media only screen and (max-width: ${variables.small}) {
        grid-template-columns: 1fr;
    }
    
    .link {
        display: block;
        color: ${props =>
        variables[props.theme.theme].white };
        text-decoration: none;
        padding: 0.4rem 0rem;
        transition: 100ms linear;
        &:hover {
            transform: scale(1.1);
            text-decoration: underline;
        }
    }
    h2 {
        margin: 2rem 0rem;
        padding: 0;
    }
    }
    .bottom {
        text-align: center;
        background-color: ${props =>
        variables[props.theme.theme].secondary };
        width: 100%;
        margin: 0;
        padding: 2rem;
        a {
            color: ${props =>
            variables[props.theme.theme].white };
            text-decoration: none;

        }
    }
    .info {
        max-width: 500px;
        margin: 0 auto;
    }
    img {
        height: 50px;
        width: 100vw;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
    }
    
`;