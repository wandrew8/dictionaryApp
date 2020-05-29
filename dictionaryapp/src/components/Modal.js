import React, { Component } from 'react';
import { ModalContainer, ContentContainer } from './styles/components/modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Modal extends React.Component{
    static propTypes = {
        heading: PropTypes.string,
        showModal: PropTypes.bool,
        closeModal: PropTypes.func
    }

    render() {
        const { showModal, heading, closeModal, show } = this.props;
        if (showModal) {
            return(
                <ModalContainer>
                <ContentContainer>
                    <div>
                        <FontAwesomeIcon className="icon" data-dismiss="modal" aria-label="Close" icon={faTimesCircle} onClick={closeModal} />
                        <h1>{heading}</h1>
                        {this.props.children}
                    </div>
                </ContentContainer>
            </ModalContainer>
            )
        }
    }
}


export default Modal;
