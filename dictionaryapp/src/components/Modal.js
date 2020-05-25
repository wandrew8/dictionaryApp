import React, { Component } from 'react';
import FirebaseAuth from './FirebaseAuth';
import { ModalContainer, Image, ContentContainer } from './styles/components/modal';
import PropTypes from 'prop-types';

export default class Modal extends Component {
    static propTypes = {
        theme: PropTypes.string,
        heading: PropTypes.string
    }
    
    render() {
        const { theme, heading } = this.props;
        return (
            <ModalContainer>
                <Image src={require(`../images/${theme}.svg`)} alt="" />
                <ContentContainer>
                    <div>
                        <h1>{heading}</h1>
                        {this.props.children}
                    </div>
                </ContentContainer>
            </ModalContainer>
        )
    }
}
