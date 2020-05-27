import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Modal from '../components/Modal';
import CollectionContainer from '../components/CollectionContainer';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import FirebaseAuth from '../components/FirebaseAuth';

const db = firebase.firestore();

export default class Collection extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        userCollection: [],
        isLoading: true,
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        signout: PropTypes.func,
        currentTheme: PropTypes.string
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
                collection.push(doc.data());
            })
            console.log(collection)
            this.setState({ userCollection: collection, isLoading: false })
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

    

    render() {
        const LoggedStatus = (props) => {
            if(props.isSignedIn) {
                return (
                    <h1>{this.state.userInfo.displayName}'s Collection</h1>
                )
            } else {
                return (
                   <Modal heading="You are not logged in" theme={this.state.currentTheme}>
                       <p>Sign up or log in to create your own word collection</p>
                       <FirebaseAuth />
                   </Modal>
                )
            }
        }
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
                {this.state.isLoading ? <Loading /> : <LoggedStatus isSignedIn={this.state.isSignedIn} />}
                {!this.state.isLoading ? this.state.userCollection.length > 0 ? <CollectionContainer collection={this.state.userCollection} /> : <p>You have no words in your collection</p> : null}
            </React.Fragment>
        )
    }
}
