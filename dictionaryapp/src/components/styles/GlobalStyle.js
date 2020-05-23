import { createGlobalStyle } from 'styled-components';
import { variables } from './variables';

const GlobalStyle = createGlobalStyle`
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}
body {
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
    color: ${props =>
    props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    font-family: ${variables.primaryFont};
    text-align: center;
}
h1, h2, h3, h4, h5, h6 {
    font-family: ${variables.headingFont};
    font-weight: 400;
    margin-bottom: 3rem;
}
`;

export default GlobalStyle;