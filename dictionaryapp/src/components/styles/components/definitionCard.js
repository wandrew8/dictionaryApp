import styled from 'styled-components';
import { variables } from '../variables';

export const DefinitionContainer = styled.div`
width: 100%;
max-width: 500px;
min-width: 250px;
height: 100%;
text-align: left;
position: relative;
background-color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].light };
color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].light : variables[props.theme.theme].dark };
padding: 1.5rem;
border: ${props =>
props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].light}` : `solid 1px ${variables[props.theme.theme].dark}` };
margin: 1rem;
border-radius: 1rem;
transition: 200ms ease-in-out;
& img {
    position: absolute;
    top: 1.5rem;
    right: 4.5rem;
    height: 75px;
    width: 75px;
    border-radius: 50%;
    border: ${props =>
    props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].light}` : `solid 1px ${variables[props.theme.theme].dark}` };
}
& h2 {
    font-size: 2rem;
    padding: 0rem;
    margin: 0rem;
}
& hr {
    text-align: center;
}
& sup {
    font-size: 0.8rem;
    color: grey;
    margin-left: 0.5rem;
}
& .example {
    font-style: italic;
    font-size: 0.9rem;
}
&:hover {
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}
.cardHeading {
    min-height: 80px;
}
.grid {
    display: grid;
    grid-template-columns: 1fr 75px;
    grid-gap: 1rem;
    justify-content: center;
    align-items: center;
}
button {
    background: transparent;
    border: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark }; 
    transition: 200ms ease-in-out;
    &:hover {
        transform: scale(1.3);
    }
    .icon {
        font-size: 2rem;
        color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark }; 
    }

}
`;
