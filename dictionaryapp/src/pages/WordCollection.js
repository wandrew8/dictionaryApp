import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ActivityNavigation from '../components/ActivityNavigation';
import CollectionContainer from '../components/CollectionContainer';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';

const db = firebase.firestore();

class WordCollection extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        wordCollection: [],
        isLoading: true,
        isShowing: true,
        showModal: true,
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
                    console.log("user not logged in")
                    this.setState({ isSignedIn: false, isLoading: false, showModal: true })
                    // this.props.history.push('/');
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
                console.log(doc.id)
                collection.push(doc);
            })
            console.log(collection)
            this.setState({ wordCollection: collection, isLoading: false })
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount() {
        if(this.unregisterAuthObserver){
            this.unregisterAuthObserver();
        }
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    signout = () => {
        firebase.auth().signOut();
        this.setState({ isSignedIn: false });
        this.props.history.push("/");
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
                    <ActivityNavigation practice={true} id={id}/>
                    {this.state.isLoading ? <Loading /> : null }
                    {this.state.wordCollection.length > 0 ? <CollectionContainer showAddWordForm={false} showRemove={false} collection={this.state.wordCollection} /> : <p>You have no words in your collection</p>}
                </React.Fragment>
            )
        } 
    }
}

export default withRouter(WordCollection);

