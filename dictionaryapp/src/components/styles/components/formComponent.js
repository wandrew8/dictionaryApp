import styled from 'styled-components';
import { variables } from '../variables';

export const Input = styled.div`
display: grid;
grid-template-columns: 1fr 25px;
position: relative;
input {
    display: block;
}
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: lightgray;
}
`;

export const CongratulationsContainer = styled.div`
width: 90%;
max-width: 700px;
min-width: 300px;
text-align: left;
border-radius: 2rem;
text-align: center;
position: relative;
box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
border: solid 2px ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].white };
background-color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
.iconContainer {
    display: block;
    text-align: center;
    color: lightgray;
    cursor: pointer;
    margin-top: 2rem;
}
.flexContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: ${variables.small}) {
        grid-template-columns: 1fr;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem 0rem 0rem 2rem;
        @media only screen and (max-width: ${variables.small}) {
        height: 60px;
        border-radius: 2rem 2rem 0rem 0rem;

    }
    }
}
.message {
    padding: 2rem;
}
`;

export const StyledForm = styled.form`
width: 90%;
max-width: 700px;
min-width: 300px;
text-align: left;
position: relative;
padding: 4rem 3rem;
border-radius: 2rem;
border: solid 2px ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].white };
box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
background-color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
color: ${props =>
props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
input, label {
    display: block;
    margin: 1rem 0rem;
    line-height: 1.8rem;
    font-size: 1.2rem;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
}
input {
    border: none;
    transition: 150ms ease-in-out;
    border-bottom: solid 2px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    :focus {
        outline: none;
        transform: scale(1.05);
    }
}
span {
    color: lightgray;
    font-size: 0.8rem;
    padding-left: 1rem;
}
.settings {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    color: lightgray;
    cursor: pointer;
    font-size: 1.5rem;
}
`;

export const Container = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
margin-bottom: 5rem;
`;