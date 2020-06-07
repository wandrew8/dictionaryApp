import styled from 'styled-components';
import { variables } from '../variables';

export const Container = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 5rem;
`;
export const FlashCard = styled.div`
max-height: 450px;
height: 450px;
max-width: 600px;
width: 100vw;
perspective: 9000px;
padding: 2rem;
display: flex;
position: relative;
cursor: pointer;
border-radius: 5px;
text-align: center;
h1 {
    font-size: 2.5rem;
}
.content {
    display: flex;
    justify-items: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: solid lightgray 2px;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
    position: relative;
    border-radius: 5px; 
}
.front, .back {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0rem 2rem;
    border-radius: 5px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* Safari */
}
.front {
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
}

.back {
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    transform: rotateX(180deg);
}
.rotate{
    transform: rotateX(180deg);
}
.definition {
    font-size: 1.5rem;
}
`;
