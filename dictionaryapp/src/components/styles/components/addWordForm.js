import styled from 'styled-components';
import { variables } from '../variables';

export const Form = styled.div`
h2 {
    padding: 0;
    margin: 0;
}
.showForm {
    transition: 300ms ease-in-out;
    z-index: 100;
    transform: translateY(0);
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    border: ${props =>
    props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].white}` : `solid 1px ${variables[props.theme.theme].dark}` };
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 450px;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    min-width: 300px;
    width: 100%;
    border-radius: 2rem;

}
.hideForm {
    transition: 300ms ease-in-out;
    z-index: -10;
    transform: translateY(0);
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    border: ${props =>
    props.theme.nightMode === "light" ? `solid 1px ${variables[props.theme.theme].white}` : `solid 1px ${variables[props.theme.theme].dark}` };
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    max-width: 450px;
    padding: 0;
    margin: 0;
    opacity: 0;
    display: hidden;
    align-items: center;
    justify-content: center;
    display: flex;
    min-width: 300px;
    width: 100%;
    border-radius: 2rem;
}
.icon {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5rem;
    cursor: pointer;
}
form {
    text-align: left;
    input, select, textarea {
        display: block;
        margin: 1.5rem 0rem;
        width: 100%;
        padding-left: 0.5rem;
        font-family: ${variables.primaryFont};
        color: ${props => variables[props.theme.theme].dark};
        background: ${props => variables[props.theme.theme].white};
        border-radius: 0.5rem;
        border: solid 2px ${props => variables[props.theme.theme].primary};
    }
    input, select {
        height: 35px;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        color: ${props =>
        props.theme.nightMode === "dark" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    }
    textarea {
        padding-top: 0.5rem;
        height: 100px;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        color: ${props =>
        props.theme.nightMode === "dark" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    }
    #hideHints, #showTimer {
        display: inline;
        height: 25px;
        width: 25px;

    }
    label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 0.25rem;
        font-size: 0.9rem;
    }

}
.formContainer {
    padding: 3rem 2rem;
    width: 100%;
}
`;