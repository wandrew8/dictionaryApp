import React, { Component } from 'react';
import firebase from 'firebase/app';
import Navigation from '../components/Navigation';
import PracticeTests from '../components/PracticeTests';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import DefinitionCard from '../components/DefinitionCard';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import WordOfDay from '../components/WordOfDay';
import { withRouter } from 'react-router';
import styled from 'styled-components';

class Home extends Component {
    state = {
        data: [],
        word: '',
        pronunciation: '',
        isLoading: true,
        isSignedIn: false,
        userInfo: '',
        badSearch: false,
        wordOfTheDay: {},
        isVisible: false,
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        theme: PropTypes.string,
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            user => {
                this.setState({ isSignedIn: !!user, userInfo: firebase.auth().currentUser })
                if(!user){
                    this.setState({ isSignedIn: false });
                }
            });
        this.getWordOfTheDay();
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

    handleSearch = (query) => {
        this.setState({ isVisible: false, isLoading: true, badSearch: false })
        fetch("https://owlbot.info/api/v4/dictionary/" + query, {
        headers: {
            Authorization: `Token ${process.env.REACT_APP_OWLBOT_API}`
        }
        }).then(res => res.status > 400 ? this.setState({ badSearch: true, isLoading: false }) : res.json())
        .then(data => {
            this.setState({ isLoading: false, data: data.definitions, word: data.word, pronunciation: data.pronunciation });
            setTimeout(() => { this.setState({ isVisible: true })}, 300)
        })
        .catch(err => console.log(err))
    }

    getWordOfTheDay = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const todayDate = `${year}-${month}-${day}`
        fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?date=${todayDate}&api_key=${process.env.REACT_APP_WORDNIK_API}`, {
            headers: {
                Accept: "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ wordOfTheDay: data, isLoading: false })
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
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
                    <SearchBar 
                        handleSearch={this.handleSearch}
                        theme={this.props.theme}
                    />
                    <FlexContainer>
                        {this.state.isLoading ? <Loading /> : null}
                        {!this.state.isLoading && this.state.word ? this.state.data.map((definition, i) => {
                            return (
                                <DefinitionCard 
                                    key={i}
                                    isSignedIn={this.state.isSignedIn}
                                    def={definition}
                                    word={this.state.word}
                                    theme={this.props.theme}
                                    index={i}
                                    isVisible={this.state.isVisible}
                                    pronunciation={this.state.pronunciation}
                                />
                            )
                        }) : null}
                        {this.state.badSearch ? <h3>No Results Found</h3> : null}
                    </FlexContainer>
                </Container>
                {this.state.isLoading ? <Loading /> : <WordOfDay nightMode={this.props.nightMode} word={this.state.wordOfTheDay} />}
                <PracticeTests/>
                <Footer/>
            </div>
        )
    }
}

//Had to wrap all my pages in the withRouter to get access to this.props.history for redirecting
export default withRouter(Home);

const FlexContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.2rem;
    justify-items: center;
    align-items: center;
    margin: 2rem 0rem;
`;

const Container = styled.main`
    min-height: calc(100vh - 100px);
    padding: 0;
    margin: 0;
`;
