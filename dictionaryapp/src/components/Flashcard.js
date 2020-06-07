import React from 'react';
import FlashcardControls from './FlashcardControls';
import PropTypes from 'prop-types';
import { Container, FlashCard } from './styles/components/flashcard';


export default class Flashcard extends React.Component {
    state = {
        showBack: false,
        showWordFirst: true,
    }

    static propTypes = {
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

    flipCard = () => {
        this.setState({ showBack: !this.state.showBack });
    }

    toggleOrder = () => {
        this.setState({ showWordFirst: !this.state.showWordFirst });
    }


    render() {
        const { word, definition, moveFirst, moveLast, currentNumber, totalNumber, movePrev, moveNext } = this.props;
        return (
            <Container>
                <div>
                    <FlashCard onClick={this.flipCard} >
                        <div className={this.state.showBack ? "content rotate" : "content"}>
                            <div className="front">
                            {this.state.showWordFirst ? <h1>{word}</h1> : <p className="definition">{definition}</p>}
                            </div>
                            <div className="back">
                            {this.state.showWordFirst ? <p className="definition">{definition}</p> : <h1>{word}</h1>}
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
                        toggleOrder={this.toggleOrder}/>
                </div>
            </Container>
        )
    }
}


