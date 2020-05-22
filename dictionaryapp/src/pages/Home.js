import React, { Component } from 'react'
import FirebaseAuth from '../components/FirebaseAuth';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the Dictionary App</h1>
                <FirebaseAuth />
            </div>
        )
    }
}
