import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SearchBar extends Component {
    state = {
        query: ''
    }

    static propTypes = {
        theme: PropTypes.func,
    }

    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.handleSearch(this.state.query);
        this.setState({ query: '' })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <input 
                        name="query" 
                        type="text" 
                        placeholder="Search for a word"
                        value={this.state.query}
                        onChange={this.handleInputChange}/>
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}
