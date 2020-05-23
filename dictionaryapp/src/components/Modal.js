import React, { Component } from 'react';
import { variables } from '../components/styles/variables';
import styled from 'styled-components';
import FirebaseAuth from './FirebaseAuth';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
    max-height: 500px;
    max-width: 700px;
    width: 90%;
    height: 90%;
    background-color: ${variables.primaryWhite};
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${variables.boxShadow};
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
` 
const ContentContainer = styled.div`
    height: 90%;
    width: 90%;
    border-radius: 1rem;
    position: fixed;
    background-color: ${props =>
    props.theme.nightMode === "light" ? variables.primaryDark : variables.primaryWhite };
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
`;

export default class Modal extends Component {
    static propTypes = {
        theme: PropTypes.string,
    }
    
    render() {
        const { theme } = this.props;
        return (
            <ModalContainer>
                <Image src={require(`../images/${theme}.svg`)} alt="" />
                <ContentContainer>
                    <div>
                        <h1>Create an Account or Log In</h1>
                        <FirebaseAuth />
                    </div>
                </ContentContainer>
            </ModalContainer>
        )
    }
}
