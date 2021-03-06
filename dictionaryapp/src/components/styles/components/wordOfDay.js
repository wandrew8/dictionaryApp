import styled from 'styled-components';
import { variables } from '../variables';

export const Container = styled.div`
margin: 0rem 0rem 5rem 0rem;
width: 100vw;
display: flex;
justify-content: center;
padding: 3rem 0rem;
border-radius: 5rem 5rem 0rem 0rem;
background-color: ${props => props.nightMode === 'light' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
@media only screen and (max-width: ${variables.small}) {
        border-radius: 0rem;
    }
.wordDay {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
    max-width: 1200px;
    
}
.heading {
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-radius: 2rem 2rem 0rem 0rem;
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    text-align: center;
    padding: 1rem;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
        font-size: 2.5rem;
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        @media only screen and (max-width: ${variables.small}) {
            font-size: 1.5rem;
    
    }
    }
}
.top {
    height: calc(100% - 120px);
}
.body {
    border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-right: none;
    border-radius: 0rem 0rem 0rem 2rem;
    height: 100%;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    
}
.bottom {
    border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    border-radius: 0rem 2rem 2rem 0rem;
    margin-top: 120px;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
}
h3 {
    font-size: 3rem;
    padding: 0rem 3rem;
    @media only screen and (max-width: ${variables.small}) {
        font-size: 2rem;
        padding: 0rem 1rem;
    }
}
.definition {
    padding: 0rem 3rem;
    font-size: 1.2rem;
}
.note {
    padding: 0rem 3rem 1rem 3rem;
    font-style: italic;
    font-size: 0.9rem;
}
sup {
    font-size: 1rem;
}
ul {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    li {
        padding: 1rem;
    }
    li:first-of-type {
        border-radius: 0rem 2rem 0rem 0rem;
    }
    li:nth-child(odd) {
        background: ${props =>
        props.theme.nightMode === "light" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
    }
    li:last-of-type {
        border-radius: 0rem 0rem 2rem 0rem;
    }
    p {
        padding: 0rem 1rem;
    }
    blockquote {
        padding: 0;
        margin: 0;
    }
}
small {
    font-style: italic;
}
@media only screen and (max-width: ${variables.large}) {
    .wordDay {
    grid-template-columns: 1fr;
    width: 90%;
    max-width: 1200px;
    }
    .top {
    height: 100%;
    }
    .body {
        border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-bottom: none;
        height: 100%;
        border-radius: 0rem;
    }
    .bottom {
        border: solid 1px ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        border-radius: 0rem 0rem 2rem 2rem;
        margin-top: 0px;
    }
    ul {
        li:first-of-type {
            border-radius: 0rem;
        }
        li:last-of-type {
            border-radius: 0rem 0rem 2rem 2rem;
        }
    }

}
`;
