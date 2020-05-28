import React, { Component } from 'react';
import ReactTooltip from "react-tooltip"; 
import { Link } from 'react-router-dom';


export default class ActivityNavigation extends Component {
    render() {
        return (
            <div>
                <ReactTooltip />
                <Link to="/review" data-tip="Review the words from your collection as interactive flashcards" >Review</Link>
                <Link to="/test" data-tip="Test your skills by taking a vocabulary test with the words from your collection" >Test</Link>
            </div>
        )
    }
}
