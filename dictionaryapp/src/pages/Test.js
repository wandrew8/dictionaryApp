import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Modal from '../components/Modal';
import ActivityNavigation from '../components/ActivityNavigation';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import FormComponent from '../components/FormComponent';
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
                if(!user){
                    this.setState({ isSignedIn: false, isLoading: false, showModal: true })
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
                        <ActivityNavigation practice={false} />
                        {this.state.isLoading ? <Loading /> : null }
                        {this.state.userCollection.length < 5 
                                ? <><p>You must have 5 or more words in your collection to take a test</p>
                                    <p>You currently have {this.state.userCollection.length} {this.state.userCollection.length === 1 ? "word" : "words"} in your collection</p></> 
                                    : <FormComponent 
                                        theme={this.props.theme} 
                                        wordCollection={this.state.userCollection} /> }
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
                    <ActivityNavigation practice={false} />
                    <Modal heading="Please Create an Account" 
                        showClose={false} 
                        showModal={this.state.showModal} 
                        closeModal={this.closeModal}>
                        <p>You must first create an account and add words to your collection</p>
                        <FirebaseAuth />
                    </Modal>
                    <Footer />
                </React.Fragment>
            )

        }
    
        }
    }
}


export default withRouter(Test);
