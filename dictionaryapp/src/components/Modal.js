import React, { Component } from 'react';
import { ModalContainer, Image, ContentContainer } from './styles/components/modal';
import PropTypes from 'prop-types';

export default class Modal extends Component {
    state = {
        theme: this.props.theme
    }

    static propTypes = {
        theme: PropTypes.string,
        heading: PropTypes.string
    }
    render() {
        const { theme, heading } = this.props;
        
        return (
            <ModalContainer>
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
