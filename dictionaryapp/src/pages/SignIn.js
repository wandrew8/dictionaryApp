import React, { Component } from 'react';
import Modal from '../components/Modal';
import FirebaseAuth from '../components/FirebaseAuth';
import PropTypes from 'prop-types';
import { variables } from '../components/styles/variables';
import styled from 'styled-components';

const Background = styled.div` 
    background-color: ${props =>
    variables[props.theme.theme].primary};
    width: 100vw;
    height: 100vh;
    clip-path: polygon(0 0, 100% 0, 100% 29%, 0 51%);
    position: relative;
    z-index: 9;
`;

const SecondBackground = styled.div`
    background-color: ${props =>
    variables[props.theme.theme].secondary};
    width: 100vw;
    height: 100vh;
    clip-path: polygon(0 0, 100% 0, 100% 29%, 0 51%);
    position: absolute;
    top: 25px;
    z-index: 5;
`;

const ThirdBackground = styled.div`
    background-color: ${props =>
    variables[props.theme.theme].tertiary};
    width: 100vw;
    height: 100vh;
    clip-path: polygon(0 0, 100% 0, 100% 29%, 0 51%);
    position: absolute;
    top: 50px;
    z-index: 2;
`;

export default class SignIn extends Component {
    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        signout: PropTypes.func,
        currentTheme: PropTypes.string
    }

    render() {
        return (
            <React.Fragment>
                <Background />
                <SecondBackground />
                <ThirdBackground />
                    <Modal showModal={true} showClose={false} heading="Create an Account or Log In" >
                        <FirebaseAuth />
                    </Modal>
            </React.Fragment>
        )
    }
}
