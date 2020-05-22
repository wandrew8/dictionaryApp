import React, { Component } from 'react'
import Navigation from '../components/Navigation';
import PropTypes from 'prop-types';


export default class Home extends Component {
    static propTypes = {
        nightMode: PropTypes.bool,
        toggleNightMode: PropTypes.func,
    }
    render() {
        return (
            <div>
                <h1>Welcome to the Dictionary App</h1>
                <Navigation toggleNightMode={this.props.toggleNightMode} nightMode={this.props.nightMode} />
            </div>
        )
    }
}
