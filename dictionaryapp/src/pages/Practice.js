import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import WordSetCard from '../components/WordSetCard';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { variables } from '../components/styles/variables';

const Container = styled.div`
    display: grid;
    min-height: calc(100vh - 100px);
    grid-template-rows: repeat(auto-fit, 250px);
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    justify-content: center;
    grid-gap: 1.5rem;
    margin: 2rem 3rem;
    @media only screen and (max-width: ${variables.small}) {
        margin: 2rem 0.5rem;
    }
`;

const db = firebase.firestore();

class Practice extends Component {
    state = {
        isSignedIn: false,
        userInfo: '',
        wordSets: [],
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
                    this.setState({ isSignedIn: false })
                    this.getWordSets();

                } else {
                    this.getWordSets();
                }
            });
    }

    getWordSets = () => {
        db.collection('wordSet')
        .get()
        .then(snapshot => {
            const collection = [];
            snapshot.docs.map(doc => {
                console.log(doc.id)
                collection.push(doc);
            })
            console.log(collection);
            this.setState({ wordSets: collection, isLoading: false })
        })
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
                    {this.state.isLoading ? <Loading /> : null }
                    <Container>
                    {this.state.isLoading ? null : this.state.wordSets.length > 0 ? this.state.wordSets.map(set => <WordSetCard key={set.id} wordSet={set.data()} id={set.id} />) : <p>Oh no! We couldn't find any word sets to practice</p>}
                    </Container>
                    <Footer />
                </React.Fragment>
            )
        }
    }
}

export default withRouter(Practice);

