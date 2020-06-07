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

class Collection extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        userCollection: [],
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

    removeItem = id => {
        const uid = this.state.userInfo.uid;
        db.collection('users')
        .doc(uid)
        .collection('wordCollection')
        .doc(id)
        .delete();
        this.getUserCollection(uid);
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
                    <ActivityNavigation practice={false} />
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
                            isSignedIn={this.state.isSignedIn}
                            userImage={this.state.userInfo ? this.state.userInfo.photoURL : ''}
                        />
                        <ActivityNavigation practice={false}/>
                        {this.state.isLoading ? <Loading /> : null }
                        {this.state.userCollection.length > 0 ? <CollectionContainer showAddWordForm={true} removeItem={this.removeItem} showRemove={true} collection={this.state.userCollection} uid={this.state.userInfo.uid} /> : <p>You have no words in your collection</p>}
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
                    <Modal heading="Please Create an Account" showClose={false} showModal={this.state.showModal} closeModal={this.closeModal}>
                        <p>You must have an account in order to create a word collection</p>
                        <FirebaseAuth />
                    </Modal>
                </React.Fragment>
            )

        }
        

        }
    }
}

export default withRouter(Collection);

