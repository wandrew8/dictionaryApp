import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Modal from '../components/Modal';
import ActivityNavigation from '../components/ActivityNavigation';
import CollectionContainer from '../components/CollectionContainer';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';
import FirebaseAuth from '../components/FirebaseAuth';

const db = firebase.firestore();

class Test extends Component {
    state = {
        isSignedIn: false,
        isLoading: true,
        userInfo: '',
        userCollection: [],
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
                //Redirects to home page if not logged in 
                if(!user){
                    console.log("user not logged in")
                    this.setState({ isSignedIn: false, isLoading: false, showModal: true })
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
            this.setState({ userCollection: collection, isLoading: false })
        })
        .catch(err => console.log(err))
    }


    render() {
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
                    />
                    <ActivityNavigation />
                    <Loading />
                </React.Fragment>
            )
        } else {
            if (this.state.isSignedIn) {
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
                        {this.state.isLoading ? <Loading /> : null }
                        {this.state.userCollection.length < 5 
                                ? <Modal heading="Oh No!" showClose={false} showModal={this.state.showModal} closeModal={this.closeModal}>
                                <p>You must have at least 5 words in your collection</p>
                                </Modal> : null }
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
                    />
                    <ActivityNavigation/>
                    <Modal heading="Please Create an Account" showClose={false} showModal={this.state.showModal} closeModal={this.closeModal}>
                        <p>You must first create an account and add words to your collection</p>
                        <FirebaseAuth />
                    </Modal>
                </React.Fragment>
            )

        }
    
        }
    }
}

export default withRouter(Test);
