import React from 'react';
import WordSetCard from './WordSetCard';
import Loading from '../components/Loading';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { variables } from './styles/variables';

const db = firebase.firestore();

const Section = styled.section`
    border-radius: 2rem 2rem 0rem 0rem;
    .title {
        font-size: 2.5rem;
        text-transform: uppercase;
    }
    .grid {
        display: grid;
        grid-template-rows: repeat(auto-fit, 250px);
        grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
        justify-content: center;
        grid-gap: 1.5rem;
        margin: 3rem 3rem 10rem 3rem;
        @media only screen and (max-width: ${variables.small}) {
            margin: 2rem 0.5rem;
        }
    }
`;

export default class PracticeTests extends React.Component {
    state = {
        isLoading: true,
        wordSets: [],
    }

    componentDidMount() {
        this.getWordSets();
    }

    getWordSets = () => {
        db.collection('wordSet')
        .get()
        .then(snapshot => {
            const collection = [];
            snapshot.docs.map(doc => {
                console.log(doc.id)
                collection.push(doc);
            })
            console.log(collection);
            this.setState({ wordSets: collection, isLoading: false })
        })
    }

    render() {
        return (
            <Section>
                <h2 className="title">Practice Your Vocabulary</h2>
                <p>Test your skills by reviewing flashcards and taking tests in any of the categories below</p>
                <div className="grid">
                    {this.state.isLoading 
                        ? <Loading/> 
                        : this.state.wordSets.length > 0 
                        ? this.state.wordSets.map(set => {
                            return <WordSetCard 
                                key={set.id} 
                                wordSet={set.data()} 
                                id={set.id} />}) 
                            : <p>Oh no! We couldn't find any word sets to practice</p>}
    
                </div>
            </Section>
        )
    }
}
