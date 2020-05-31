import React from 'react';
import styled from 'styled-components';
import FlashcardControls from './FlashcardControls';
import PropTypes from 'prop-types';
import { variables } from '../components/styles/variables';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;
`;
const FlashCard = styled.div`
    max-height: 450px;
    height: 450px;
    max-width: 600px;
    width: 100vw;
    perspective: 9000px;
    padding: 2rem;
    display: flex;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    h1 {
        font-size: 2.5rem;
    }
    .content {
        display: flex;
        justify-items: center;
        align-items: center;
        height: 100%;
        width: 100%;
        border: solid lightgray 2px;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
        position: relative;
        border-radius: 5px; 
    }
    .front, .back {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 0rem 2rem;
        border-radius: 5px;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden; /* Safari */
    }
    .front {
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
    }

    .back {
        background-color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].dark : variables[props.theme.theme].white };
        color: ${props =>
        props.theme.nightMode === "light" ? variables[props.theme.theme].white : variables[props.theme.theme].dark };
        transform: rotateX(180deg);
    }
    .rotate{
        transform: rotateX(180deg);
    }
    .definition {
        font-size: 1.5rem;
    }
`;

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


