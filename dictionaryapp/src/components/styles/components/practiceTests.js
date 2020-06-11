import styled from 'styled-components';
import { variables } from '../variables';

export const Section = styled.section`
    padding: 0rem 2rem;
    .title {
        font-size: 2.5rem;
        text-transform: uppercase;
    }
    .grid {
        display: grid;
        grid-template-rows: repeat(auto-fit, 250px);
        grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
        justify-content: center;
        grid-gap: 1.5rem;
        margin: 3rem 3rem 10rem 3rem;
        @media only screen and (max-width: ${variables.small}) {
            margin: 2rem 0.5rem;
        }
    }
`;
