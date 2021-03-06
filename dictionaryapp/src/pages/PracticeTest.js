import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ActivityNavigation from '../components/ActivityNavigation';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import FormComponent from '../components/FormComponent';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';

const db = firebase.firestore();

class Test extends Component {
    state = {
        isSignedIn: false,
        isLoading: true,
        userInfo: '',
        wordCollection: [],
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        theme: PropTypes.string
    }

    signout = () => {
        firebase.auth().signOut();
        this.setState({ isSignedIn: false });
        this.props.history.push("/");
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            user => {
                this.setState({ isSignedIn: !!user, userInfo: firebase.auth().currentUser })
                if(!user){
                    this.getWordsFromCollection();
                    this.setState({ isSignedIn: false })
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
            this.setState({ wordCollection: collection, isLoading: false })
        })
        .catch(err => console.log(err))
    }

    render() {
        const id = this.props.match.params.id
        if (this.state.isLoading) {
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
                    <Loading />
                </React.Fragment>
            )
        } else {
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
                    {this.state.isLoading ? <Loading /> : null }
                    {this.state.wordCollection.length < 5 
                            ? <><p>You must have 5 or more words in your collection to take a test</p>
                            <p>You currently have {this.state.wordCollection.length} {this.state.wordCollection.length === 1 ? "word" : "words"} in your collection</p></> 
                            : <FormComponent 
                                theme={this.props.theme} 
                                wordCollection={this.state.wordCollection} /> }
                    <Footer />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(Test);
