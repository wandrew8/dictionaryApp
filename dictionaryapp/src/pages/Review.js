import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ActivityNavigation from '../components/ActivityNavigation';
import Loading from '../components/Loading';
import Flashcard from '../components/Flashcard';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import { withRouter } from 'react-router';
import firebase from 'firebase';

const db = firebase.firestore();

class Review extends Component {
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
                if(!user){
                    this.setState({ isSignedIn: false })
                } else {
                    this.getUserCollection(this.state.userInfo.uid)
                }
            });
    }

    getUserCollection = uid => {
        db.collection('users')
        .doc(uid)
        .collection('wordCollection')
        .get()
        .then(snapshot => {
            const collection = []
            snapshot.docs.map(doc => {
                collection.push(doc);
            })
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
        this.props.history.push("/");
    }

    moveNext = () => {
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
                    isSignedIn={this.state.isSignedIn}
                    userImage={this.state.userInfo ? this.state.userInfo.photoURL : ''}
                />
                <ActivityNavigation practice={false}/>
                {this.state.isLoading ? <Loading /> : null}
                {!this.state.isLoading && this.state.userCollection.length > 0 ? <Flashcard
                    moveFirst={this.moveFirst}
                    moveLast={this.moveLast}
                    movePrev={this.movePrev}
                    moveNext={this.moveNext} 
                    currentNumber={this.state.currentNumber}
                    totalNumber={this.state.totalNumber}
                    word={this.state.userCollection[this.state.currentNumber].data().word} 
                    definition={this.state.userCollection[this.state.currentNumber].data().definition} id={this.state.userCollection[0].id} /> : null }
                {!this.state.isLoading && this.state.userCollection.length === 0 ? <p>You have no words in your collection to review</p> : null}
                {this.state.isLoading ? null : <Footer/>}
            </React.Fragment>
        )
    }
}

export default withRouter(Review);
