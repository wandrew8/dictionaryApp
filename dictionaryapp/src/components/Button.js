import React from 'react';
import styled from 'styled-components';
import { variables } from './styles/variables';

const StyledButton = styled.button`
    font-size: 1rem;
    height: 35px;
    width: 100px;
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

export default function Button(props) {
    return (
        <StyledButton>
            {props.children}
        </StyledButton>
    )
}
