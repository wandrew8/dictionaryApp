import styled from 'styled-components';
import { variables } from '../variables';

export const NavBar = styled.div`
position: absolute;
top: 0;
width: 100%;
height: 50px;
box-shadow: ${variables.boxShadow};
display: flex;
justify-content: space-between;
padding: 0rem 3rem 0rem 0rem;
align-items: center;
background: ${props => variables[props.theme.theme].primary};
.flexItem {
    display: flex;
    justify-content: center;
    align-items: center;
}
.drawer {
    right: 0px;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].backgroundLight };
    position: absolute;
    top: 50px;
    width: 300px;
    z-index: 11;
    border-left: 2px solid gray;
    border-bottom: solid 2px gray;
    transition: 350ms ease-in-out;
    padding-bottom: 5rem;
    height: calc(100vh - 50px);
    overflow: auto;
    visibility: visible;
    
}
.open {
    visibility: hidden;
    display: none;
    transform: translateX(300px);
}
.selected {
    background-color: lightgrey;
}
ul {
    width: 100%;
    padding: 0;
    margin: 0;
}
.icon {
    cursor: pointer;
}
li {
    list-style: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    transition: 200ms ease-in;

    &:hover {
        background: lightgray;
    }
}
.avatar img {
    height: 35px;
    width: 35px;
    margin-right: 1rem;
    box-shadow: 0px 0px 2px rgba(0,0,0,0.8);
    border-radius: 50%;
}
.link {
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => variables[props.theme.theme].white};
    margin: 0rem 1rem;
    transition: 200ms linear;
    padding-bottom: 0.25rem;
    &:hover {
        border-bottom: 5px solid rgba(0, 0,0,0.1);

    }
}
small {
    color: lightgray;
    font-size: 0.8rem;
    text-align: center;
    .credit {
        color: lightgray;
        font-size: 0.8rem;
        display: inline;
        text-decoration: none;
        cursor: pointer;
    }
}
.navLinks {
    margin: 0rem 2rem;
    
}
@media only screen and (max-width: ${variables.large}) {
    .navLinks {
        display: none;
    }
}
@media only screen and (max-width: ${variables.small}) {
    justify-content: flex-end;
    
}

`;

export const LoggedIn = styled.div`
padding: 0rem 2rem 0rem 1rem;
text-align: left;
display: flex;
align-items: center;
justify-content: space-between;
`;

export const NavSection = styled.nav`
text-align: left;
padding: 0rem 1rem 0rem 0rem;
.signOut {
    display: block;
    padding: 0.5rem;
    font-size: 1rem;
    background: transparent;
    border: none;
    font-family: ${variables.primaryFont};
    transition: 200ms ease-in;
    width: 100%;
    text-align: left;
    cursor: pointer;
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    &:hover {
        background: lightgray;
    }
}
h3 {
    margin: 1rem 1rem 0rem 1rem;
    padding: 0rem;
}
a {
    font-size: 1rem;
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    text-decoration: none;
    display: block;
    padding: 0.5rem;
    transition: 200ms ease-in;
    &:hover {
        background: lightgray;
    }

}
p{
    font-size: 1rem;
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    padding: 0.5rem;
    margin: 0;
    transition: 200ms ease-in;
    cursor: pointer;
    &:hover {
        background: lightgray;
    }
}

`
