import styled from 'styled-components';
import { variables } from '../variables';

export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
    max-height: 500px;
    max-width: 700px;
    width: 90%;
    height: 90%;
    /* background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].backgroundLight : variables[props.theme.theme].backgroundDark }; */
    background-color: transparent;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
`;

export const ContentContainer = styled.div`
    height: 90%;
    width: 90%;
    border-radius: 1rem;
    position: fixed;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem 0.5rem;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;
