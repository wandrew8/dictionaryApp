import React, { Component } from 'react';
import ReactTooltip from "react-tooltip"; 
import { Container } from './styles/components/navigation';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class ActivityNavigation extends Component {
    static propTypes = {
        practice: PropTypes.bool,
        id: PropTypes.string
    }
    render() {
        const { id } = this.props;
        if(!this.props.practice) {
            return (
                <Container>
                <ReactTooltip />
                <NavLink activeClassName="selected" to="/collection" data-tip="View the words in your collection">Collection</NavLink>
                <NavLink activeClassName="selected" to="/review" data-tip="Review the words from your collection as interactive flashcards" >Review</NavLink>
                <NavLink activeClassName="selected" to="/test" data-tip="Test your skills by taking a vocabulary test with the words from your collection" >Test</NavLink>
                </Container>
            )
        } else {
            return (
                <Container>
                <ReactTooltip />
                <NavLink activeClassName="selected" to={`/practice/${id}`} data-tip="View the words in your collection">Collection</NavLink>
                <NavLink activeClassName="selected" to={`/practice-review/${id}`} data-tip="Review the words from your collection as interactive flashcards" >Review</NavLink>
                <NavLink activeClassName="selected" to={`/practice-test/${id}`} data-tip="Test your skills by taking a vocabulary test with the words from your collection" >Test</NavLink>
                </Container>
            )
        }
    }
}
