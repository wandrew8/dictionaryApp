import React, { Component } from 'react'
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import DefinitionCard from '../components/DefinitionCard';
import PropTypes from 'prop-types';


export default class Home extends Component {
    state = {
        data: [],
        word: '',
        pronunciation: '',
        isLoading: false,
    }

    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        theme: PropTypes.string,
    }

    handleSearch = (query) => {
        this.setState({ isLoading: true })
        fetch("https://owlbot.info/api/v4/dictionary/" + query, {
        headers: {
            Authorization: `Token ${process.env.REACT_APP_OWLBOT_API}`
        }
        }).then(res => res.json())
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
                    toggleTheme={this.props.toggleTheme}
                     />
                <h1>Welcome to the Dictionary App</h1>
                <SearchBar 
                    handleSearch={this.handleSearch}
                    theme={this.props.theme}
                />
                {!this.state.isLoading && this.state.data.length > 0 ? this.state.data.map((definition, i) => {
                    return (
                        <DefinitionCard 
                            key={i}
                            def={definition}
                            word={this.state.word}
                            pronunciation={this.state.pronunciation}
                        />
                    )
                }) : null}
            </div>
        )
    }
}
