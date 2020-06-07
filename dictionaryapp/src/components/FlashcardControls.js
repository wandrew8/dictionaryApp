import React from 'react';
import PropTypes from 'prop-types';
import { Controls } from './styles/components/flashcardControls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faAngleDoubleLeft, faAngleDoubleRight, faSync } from '@fortawesome/free-solid-svg-icons';


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
