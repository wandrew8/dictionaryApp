import React, { Component } from 'react';
import Modal from '../components/Modal';
import PropTypes from 'prop-types';

export default class SignIn extends Component {
    static propTypes = {
        theme: PropTypes.string,
    }
    render() {
        return (
            <div>
                <Modal theme={this.props.theme} />
            </div>
        )
    }
}
