import styled from 'styled-components';
import { variables } from '../variables';

export const InverseButton = styled.button`
    font-size: 1rem;
    height: 35px;
    width: 110px;
    font-family: ${variables.primaryFont};
    color: ${props => variables[props.theme.theme].dark};
    background: ${props => variables[props.theme.theme].white};
    border-radius: 0.5rem;
    transition: 300ms ease-in-out;
    border: solid 2px ${props => variables[props.theme.theme].primary};
    &:hover {
        background: ${props => variables[props.theme.theme].primary};
        color: ${props => variables[props.theme.theme].white};
    }
`;

export const StyledButton = styled.button`
    font-size: 1rem;
    height: 35px;
    width: 100px;
    font-family: ${variables.primaryFont};
    color: ${props => variables[props.theme.theme].white};
    background: ${props => variables[props.theme.theme].primary};
    border-radius: 0.5rem;
    transition: 300ms ease-in-out;
    border: solid 2px ${props => variables[props.theme.theme].primary};
    &:hover {
        background: transparent;
        color: ${props => 
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
`;
