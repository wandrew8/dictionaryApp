import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Modal from '../components/Modal';
import ActivityNavigation from '../components/ActivityNavigation';
import CollectionContainer from '../components/CollectionContainer';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import FirebaseAuth from '../components/FirebaseAuth';

const db = firebase.firestore();

const Container = styled.div`
    min-height: calc(100vh - 120px);
    text-align: center;
    .message {
        font-size: 1.5rem;
        padding: 2rem 1rem;
    }
    p {
        font-size: 1.1rem;
        
    }
`;

class Collection extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        userCollection: [],
        isLoading: true,
        isShowing: true,
        showModal: true,
        isVisible: false,
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
                    this.setState({ isSignedIn: false, isLoading: false, showModal: true })
                } else {
                    this.getUserCollection(this.state.userInfo.uid)
                }
            });
    }

    getUserCollection = uid => {
        this.setState({ isVisible: false });
        db.collection('users')
        .doc(uid)
        .collection('wordCollection')
        .get()
        .then(snapshot => {
            const collection = []
            snapshot.docs.map(doc => {
                collection.push(doc);
            })
            this.setState({ userCollection: collection, isLoading: false })
            // It's kind of hacky, but I couldn't figure out a better way to get the animations working
            setTimeout(() => { this.setState({ isVisible: true })}, 300)

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
        setTimeout(() => {this.getUserCollection(uid)}, 500);
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
                        {this.state.userCollection.length > 0 
                        ? <CollectionContainer 
                            isVisible={this.state.isVisible} 
                            getUserCollection={this.getUserCollection} 
                            showAddWordForm={true} removeItem={this.removeItem} 
                            showRemove={true} collection={this.state.userCollection} 
                            uid={this.state.userInfo.uid} /> 
                            : <p>You have no words in your collection</p>}
                        <Footer />
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
                    <Container>
                        <p className="message">You must have an account in order to create a word collection</p>
                        <p>Sign Up for an Account <Link to="/create-account">Here</Link></p>
                        {this.state.showModal ? <Modal heading="Please Create an Account" showClose={true} showModal={this.state.showModal} closeModal={this.closeModal}>
                            <p>You must have an account in order to create a word collection</p>
                            <FirebaseAuth />
                        </Modal> : null }
                    </Container>
                    <Footer />
                </React.Fragment>
            )

        }
        

        }
    }
}

export default withRouter(Collection);

