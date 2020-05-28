import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faAngleDoubleLeft, faAngleDoubleRight, faSync } from '@fortawesome/free-solid-svg-icons';


const Controls = styled.div`
    display: flex;
    width: 95%;
    max-width: 300px;
    margin: 0 auto;
    justify-content: center;
    .icon {
        cursor: pointer;
        font-size: 1.5rem;
        margin: 0.5rem 1rem;
    }
`;

export default function FlashcardControls(props) {
    const { totalNumber, currentNumber, moveNext, movePrev, moveFirst, moveLast, toggleOrder } = props;
    return (
        <React.Fragment>
            <Controls>
                <FontAwesomeIcon 
                    onClick={moveFirst} 
                    icon={faAngleDoubleLeft} 
                    className="icon" />
                <FontAwesomeIcon 
                    onClick={movePrev} 
                    icon={faArrowLeft} 
                    className="icon" />
                <FontAwesomeIcon 
                    onClick={toggleOrder} 
                    icon={faSync} 
                    className="icon" />
                <FontAwesomeIcon 
                    onClick={moveNext} 
                    icon={faArrowRight} 
                    className="icon" />
                <FontAwesomeIcon 
                    onClick={moveLast} 
                    icon={faAngleDoubleRight} 
                    className="icon" />
            </Controls>
            <p>{currentNumber}/{totalNumber}</p>
        </React.Fragment>
    )
}

FlashcardControls.propTypes = {
    toggleOrder: PropTypes.func,
    currentNumber: PropTypes.number,
    totalNumber: PropTypes.number,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
    moveFirst: PropTypes.func,
    moveLast: PropTypes.func

}
