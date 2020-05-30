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
                <Modal showModal={true} showClose={false} heading="Create an Account or Log In" >
                    <FirebaseAuth />
                </Modal>
            </React.Fragment>
        )
    }
}
