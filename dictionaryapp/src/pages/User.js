import React, { Component } from 'react';
import firebase from 'firebase/app';

export default class User extends Component {
    state = {
        isSignedIn: false,
        userName: ''
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            user => {
                this.setState({ isSignedIn: !!user, userName: firebase.auth().currentUser })
                //Redirects to home page if not logged in 
                if(!user){
                    this.props.history.push('/');
                }
            });
    }

    componentWillUnmount() {
        if(this.unregisterAuthObserver){
            this.unregisterAuthObserver();
        }
    }
    render() {
        return (
            <div>
                <h1>You are logged in</h1>
            </div>
        )
    }
}
