import React, { Component } from 'react'
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';
import PropTypes from 'prop-types';


export default class Home extends Component {
    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
    }

    handleSearch = (query) => {
        fetch("https://owlbot.info/api/v4/dictionary/" + query, {
        headers: {
            Authorization: `Token ${process.env.REACT_APP_OWLBOT_API}`
        }
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Navigation 
                    toggleNightMode={this.props.toggleNightMode} 
                    nightMode={this.props.nightMode}
                    toggleTheme={this.props.toggleTheme}
                     />
                <h1>Welcome to the Dictionary App</h1>
                <SearchBar 
                    handleSearch={this.handleSearch}
                />
            </div>
        )
    }
}
