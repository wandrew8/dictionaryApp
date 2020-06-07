import styled from 'styled-components';
import { variables } from '../variables';

export const StyledHeader = styled.header`
position: relative;
width: 100%;
height: 100px;
background: ${props => variables[props.theme.theme].secondary};
box-shadow: ${variables.boxShadow};
&:after {
position: absolute;
border-style: solid;
border-width: 0 0 100px 500px;
border-color: transparent transparent rgba(255, 255, 255, 0.3) transparent;
right: 0;
top: 0;
content: "";
}
&:before  {
position: absolute;
border-style: solid;
border-width: 50px 0 0 70px;
border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
left: 0;
bottom: 0;
content: "";
}
`
