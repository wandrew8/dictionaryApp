import React, { Component } from 'react';
import Modal from '../components/Modal';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import FirebaseAuth from '../components/FirebaseAuth';
import PropTypes from 'prop-types';

export default class SignIn extends Component {
    static propTypes = {
        nightMode: PropTypes.string,
        toggleNightMode: PropTypes.func,
        toggleTheme: PropTypes.func,
        signout: PropTypes.func,
        currentTheme: PropTypes.string
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Navigation 
                    toggleNightMode={this.props.toggleNightMode} 
                    nightMode={this.props.nightMode}
                    signout={this.signout}
                    toggleTheme={this.props.toggleTheme}
                    currentTheme={this.props.theme}
                />
                <Modal theme={this.props.theme} heading="Create an Account or Log In" >
                    <FirebaseAuth />
                </Modal>
            </React.Fragment>
        )
    }
}
