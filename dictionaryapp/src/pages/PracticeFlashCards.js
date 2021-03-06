import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ActivityNavigation from '../components/ActivityNavigation';
import Loading from '../components/Loading';
import Flashcard from '../components/Flashcard';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import firebase from 'firebase/app';

const db = firebase.firestore();

class Review extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        wordCollection: [],
        isLoading: true,
        currentNumber: 0,
        totalNumber: 0,
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        theme: PropTypes.string
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            user => {
                this.setState({ isSignedIn: !!user, userInfo: firebase.auth().currentUser })
                if(!user){
                    this.setState({ isSignedIn: false });
                    this.getWordsFromCollection();
                } else {
                    this.getWordsFromCollection();
                }
            });
    }

    getWordsFromCollection = () => {
        const id = this.props.match.params.id
        db.collection('wordSet')
        .doc(id)
        .collection('words')
        .get()
        .then(snapshot => {
            const collection = []
            snapshot.docs.map(doc => {
                collection.push(doc);
            })
            this.setState({ wordCollection: collection, isLoading: false, totalNumber: collection.length })
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount() {
        if(this.unregisterAuthObserver){
            this.unregisterAuthObserver();
        }
    }

    signout = () => {
        firebase.auth().signOut();
        this.setState({ isSignedIn: false });
        this.props.history.push("/");
    }

    moveNext = () => {
        console.log("you click the next arrow")
        if(this.state.currentNumber + 1 !== this.state.totalNumber) {
            this.setState({ currentNumber: this.state.currentNumber + 1 });
        } else {
            this.setState({ currentNumber: 0 })
        }
    }

    movePrev = () => {
        if(this.state.currentNumber === 0) {
            this.setState({ currentNumber: this.state.totalNumber - 1 });
        } else {
            this.setState({ currentNumber: this.state.currentNumber - 1 })
        }
    }

    moveLast = () => {
        this.setState({ currentNumber: this.state.totalNumber - 1 });
    }

    moveFirst = () => {
        this.setState({ currentNumber: 0 })
    }

    render() {
        const id = this.props.match.params.id
        return (
            <React.Fragment>
                <Header />
                <Navigation 
                    toggleNightMode={this.props.toggleNightMode} 
                    nightMode={this.props.nightMode}
                    signout={this.signout}
                    toggleTheme={this.props.toggleTheme}
                    currentTheme={this.props.theme}
                    isSignedIn={this.state.isSignedIn}
                    userImage={this.state.userInfo ? this.state.userInfo.photoURL : ''}
                />
                <ActivityNavigation practice={true} id={id} />
                {this.state.isLoading ? <Loading /> : null}
                {!this.state.isLoading && this.state.wordCollection.length > 0 ? <Flashcard
                    moveFirst={this.moveFirst}
                    moveLast={this.moveLast}
                    movePrev={this.movePrev}
                    moveNext={this.moveNext} 
                    currentNumber={this.state.currentNumber}
                    totalNumber={this.state.totalNumber}
                    word={this.state.wordCollection[this.state.currentNumber].data().word} 
                    definition={this.state.wordCollection[this.state.currentNumber].data().definition} id={this.state.wordCollection[0].id} /> : null }
                {!this.state.isLoading && this.state.wordCollection.length === 0 ? <p>You have no words in your collection to review</p> : null}
                {this.state.isLoading ? null : <Footer />}
            </React.Fragment>
        )
    }
}

export default withRouter(Review);
