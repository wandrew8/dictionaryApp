import React from 'react';
import { ModalContainer, ContentContainer } from './styles/components/modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function Modal(props) {
    const { showModal, heading, closeModal, showClose } = props;
    if (showModal) {
        return(
            <ModalContainer>
                <ContentContainer>
                    <div>
                        {showClose ? <FontAwesomeIcon className="icon" data-dismiss="modal" aria-label="Close" icon={faTimesCircle} onClick={closeModal} /> : null }
                        <h1>{heading}</h1>
                        {props.children}
                    </div>
                </ContentContainer>
            </ModalContainer>
        )
    }
    
}

Modal.propTypes = {
    heading: PropTypes.string,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    showClose: PropTypes.bool,
}
