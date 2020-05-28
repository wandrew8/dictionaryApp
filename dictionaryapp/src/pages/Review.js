import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ActivityNavigation from '../components/ActivityNavigation';
import Loading from '../components/Loading';
import Flashcard from '../components/Flashcard';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const db = firebase.firestore();

export default class Review extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        userCollection: [],
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
                //Redirects to home page if not logged in 
                if(!user){
                    this.setState({ isSignedIn: false })
                    // this.props.history.push('/');
                } else {
                    this.getUserCollection(this.state.userInfo.uid)
                }
            });
    }

    getUserCollection = uid => {
        console.log(uid)
        db.collection('users')
        .doc(uid)
        .collection('wordCollection')
        .get()
        .then(snapshot => {
            const collection = []
            snapshot.docs.map(doc => {
                console.log(doc.id)
                collection.push(doc);
            })
            console.log(collection)
            this.setState({ userCollection: collection, isLoading: false, totalNumber: collection.length })
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
        console.log("You are successfully signed Out")
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
        return (
            <React.Fragment>
                <Header />
                <Navigation 
                    toggleNightMode={this.props.toggleNightMode} 
                    nightMode={this.props.nightMode}
                    signout={this.signout}
                    toggleTheme={this.props.toggleTheme}
                    currentTheme={this.props.theme}
                />
                <ActivityNavigation />
                {this.state.isLoading ? <Loading /> : <Flashcard
                    moveFirst={this.moveFirst}
                    moveLast={this.moveLast}
                    movePrev={this.movePrev}
                    moveNext={this.moveNext} 
                    currentNumber={this.state.currentNumber}
                    totalNumber={this.state.totalNumber}
                    word={this.state.userCollection[this.state.currentNumber].data().word} 
                    definition={this.state.userCollection[this.state.currentNumber].data().definition} id={this.state.userCollection[0].id} />}
            </React.Fragment>
        )
    }
}
