import React, { useState, useEffect } from 'react';
import WordSetCard from './WordSetCard';
import Loading from '../components/Loading';
import firebase from 'firebase/app';
import { Section } from './styles/components/practiceTests';

const db = firebase.firestore();


export default function PracticeTests() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ wordSets, setWordSets ] = useState([]);

    useEffect(() => {
        getWordSets();
    }, [])

    const getWordSets = () => {
        db.collection('wordSet')
        .get()
        .then(snapshot => {
            const collection = [];
            snapshot.docs.map(doc => {
                return collection.push(doc);
            })
            setWordSets(collection);
            setIsLoading(false);
        })
    }

    return (
        <Section>
            <h2 className="title">Practice Your Vocabulary</h2>
            <p>Test your skills by reviewing flashcards and taking tests in any of the categories below</p>
            <div className="grid">
                {isLoading 
                    ? <Loading/> 
                    : wordSets.length > 0 
                    ? wordSets.map(set => {
                        return <WordSetCard 
                            key={set.id} 
                            wordSet={set.data()} 
                            id={set.id} />}) 
                        : <p>Oh no! We couldn't find any word sets to practice</p>}

            </div>
        </Section>
    )
}
