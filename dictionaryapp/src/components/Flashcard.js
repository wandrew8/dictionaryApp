import React, { useState } from 'react';
import FlashcardControls from './FlashcardControls';
import PropTypes from 'prop-types';
import { Container, FlashCard } from './styles/components/flashcard';


export default function Flashcard(props) {
    const [showBack, setShowBack] = useState(false);
    const [showWordFirst, setShowWordFirst] = useState(true);
    
    const flipCard = () => {setShowBack(!showBack)};
    const toggleOrder = () => {setShowWordFirst(!showWordFirst)};

   
    const { word, definition, moveFirst, moveLast, currentNumber, totalNumber, movePrev, moveNext } = props;
    return (
        <Container>
            <div>
                <FlashCard onClick={flipCard} >
                    <div className={showBack ? "content rotate" : "content"}>
                        <div className="front">
                        {showWordFirst ? <h1>{word}</h1> : <p className="definition">{definition}</p>}
                        </div>
                        <div className="back">
                        {showWordFirst ? <p className="definition">{definition}</p> : <h1>{word}</h1>}
                        </div>
                    </div>
                </FlashCard>
                <FlashcardControls 
                    moveFirst={moveFirst}
                    moveLast={moveLast}
                    movePrev={movePrev}
                    moveNext={moveNext}
                    currentNumber={currentNumber + 1}
                    totalNumber={totalNumber}
                    toggleOrder={toggleOrder}/>
            </div>
        </Container>
    )
    
}


Flashcard.propTypes = {
    word: PropTypes.string,
    definition: PropTypes.string,
    id: PropTypes.string,
    totalNumber: PropTypes.number,
    currentNumber: PropTypes.number,
    moveNext: PropTypes.func,
    movePrev: PropTypes.func,
    moveFirst: PropTypes.func,
    moveLast: PropTypes.func

}