import styled from 'styled-components';
import { variables } from '../variables';

export const SingleDefinition = styled.li`
    display: grid;
    position: relative;
    opacity: ${props => props.isVisible ? '1' : '0'};
    grid-template-columns: repeat( auto-fit, 300px minmax(300px, 1fr) 50px );
    justify-content: center;
    grid-gap: 1rem;
    padding: 0.25rem 1rem;
    align-items: center;
    border-bottom: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    transform: ${props => props.isVisible
                ? 'translateY(0%)'
                : 'translateY(10%)'};	
    transition-timing-function: ease-in-out; 
    transition-duration: 300ms;
    transition-property: box-shadow, transform, opacity;
    transition-delay: 0ms, ${props => 200 * props.index}ms, ${props => 200 * props.index}ms;
    @media only screen and (max-width: ${variables.medium}) {
        grid-template-columns: 1fr;
        .word {
            text-align: left;
        }
        .remove {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
    .definition {
        text-align: left;
    }
    .icon {
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        transition: 200ms ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.3);
        }
    }
    h2 {
        font-size: 2.5rem;
        margin: 0rem;
    }
    sup {
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }
    .example {
        font-style: italic;
        font-size: 0.9rem;
    }
    &:first-of-type {
        border-top: solid 1px ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
    &:last-of-type {
        border-bottom: none;
    }
    &:hover {
        box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    }
    &:nth-child(odd) {
        background: ${props =>
            props.theme.nightMode === "light" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
    }
    &:last-of-type {
        margin-bottom: -1rem;
        border-radius: 0rem 0rem 1rem 1rem;
    }

    `;

    export const Container = styled.div`
    width: 90%;
    max-width: 800px;
    min-width: 300px;
    min-height: 400px;
    position: relative;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    font-family: ${variables.primaryFont};
    border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-radius: 1rem;
    h2 {
        margin-bottom: 1.5rem;

    }
    .addicon {
        position: absolute;
        top: 1rem;
        right: 2rem;
        font-size: 2rem;
        color: lightgray;
        cursor: pointer;
    }
`;

