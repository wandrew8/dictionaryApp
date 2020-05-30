import React, { Component } from 'react';
import firebase from 'firebase/app';
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import DefinitionCard from '../components/DefinitionCard';
import Loading from '../components/Loading';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const FlexContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.2rem;
    justify-items: center;
    align-items: center;
`;

class Home extends Component {
    state = {
        data: [],
        word: '',
        pronunciation: '',
        isLoading: false,
        isSignedIn: false,
        userInfo: '',
        badSearch: false,
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
                console.log(user)
                this.setState({ isSignedIn: !!user, userInfo: firebase.auth().currentUser })
                if(!user){
                    this.setState({ isSignedIn: false });
                }
            });
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
        this.setState({ isLoading: true, badSearch: false })
        fetch("https://owlbot.info/api/v4/dictionary/" + query, {
        headers: {
            Authorization: `Token ${process.env.REACT_APP_OWLBOT_API}`
        }
        }).then(res => res.status > 400 ? this.setState({ badSearch: true, isLoading: false }) : res.json())
        .then(data => {
            console.log(data);
            this.setState({ isLoading: false, data: data.definitions, word: data.word, pronunciation: data.pronunciation });
        })
        .catch(err => console.log(err))
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
                <h1>Welcome to the Dictionary App</h1>
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
                                pronunciation={this.state.pronunciation}
                            />
                        )
                    }) : null}
                    {this.state.badSearch ? <h3>No Results Found</h3> : null}
                </FlexContainer>
            </div>
        )
    }
}

export default withRouter(Home);
