import styled from 'styled-components';
import { variables } from '../variables';

export const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
border-bottom: 1px solid ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
border-top: solid 1px ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
justify-content: center;
align-items: center;
margin-bottom: 2rem;
background-color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
a {
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    padding: 1rem;
    border-right: solid 1px black;
    text-decoration: none;
    &:last-of-type {
        border-right: none;
    }
}
.selected {
    color: ${props => 
    variables[props.theme.theme].white};
    background-color: ${props =>
    variables[props.theme.theme].primary};
}
`;
