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
    background-color: white;
    border: solid 1px black;
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
    background-color: white;
    border: solid 1px black;
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
    top: 1rem;
    right: 1rem;
}
form {
    text-align: left;
    label, input, select, textarea {
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
        
    }
    textarea {
        height: 100px;
    }

}
.formContainer {
    padding: 3rem 2rem;
}
`;