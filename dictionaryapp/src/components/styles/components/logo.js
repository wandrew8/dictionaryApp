import styled from 'styled-components';
import { variables } from '../variables';

export const StyledImage = styled.img`
width: 90%;
max-width: 250px;
height: 100%;
object-fit: cover;
top: 0;
left: 0;
position: absolute;

`;

export const LogoContainer = styled.div`
a {
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}
.overlay {
    width: 80%;
    max-width: 500px;
    height: 100%;
    background: linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0));
    z-index: 80;
    position: absolute;
    top: 0;
    left: 0;

}
h1 {
    font-size: 1.5rem;
    color: ${props => variables[props.theme.theme].white};
    z-index: 100;
    padding: 0;
    margin: 0rem 3rem;
    text-transform: uppercase;
}
@media only screen and (max-width: ${variables.small}) {
    display: none;

}
`;