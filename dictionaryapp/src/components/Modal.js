import React, { Component } from 'react';
import { ModalContainer, ContentContainer } from './styles/components/modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Modal extends React.Component{
    static propTypes = {
        heading: PropTypes.string,
        showModal: PropTypes.bool,
        closeModal: PropTypes.func,
        showClose: PropTypes.bool,
    }

    render() {
        const { showModal, heading, closeModal, showClose } = this.props;
        if (showModal) {
            return(
                <ModalContainer>
                <ContentContainer>
                    <div>
                        {showClose ? <FontAwesomeIcon className="icon" data-dismiss="modal" aria-label="Close" icon={faTimesCircle} onClick={closeModal} /> : null }
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
