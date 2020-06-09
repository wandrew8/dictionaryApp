import styled from 'styled-components';
import { variables } from '../variables';

export const Container = styled.div`
    min-height: calc(100vh - 100px);
    a {
        text-decoration: none;
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }
    .card {
        border: solid 1px lightgray;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        min-height: 250px;
        transition: 100ms ease-out;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
        &:hover {
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
    }
    h2 {
        font-size: 1.5rem;
        padding: 0.5rem 0rem;
        opacity: 0.9;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
        margin: 0;
        width: 95%;
        z-index: 9;
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white }; 
    }
    img {
        position: absolute;
        width: 95%;
        height: 95%;
        margin: auto;
        position: absolute;
        border-radius: 10px;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
        top: 50%;
        object-fit: cover;
        top: 50%; left: 50%;
        -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
    }
    
`;