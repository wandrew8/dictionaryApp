import React from 'react';
import { Link } from 'react-router-dom';
import { StyledFooter } from './styles/components/footer';
import { withTheme } from 'styled-components';

function Footer(props) {
    const { theme } = props;
    
    return (
        <StyledFooter>
                <img src={require(`../images/${theme.theme}.svg`)} alt="" />
                <div className="mainContent">
                    <div className="info">
                        <h2>Dictionary App</h2>
                        <p>Improve your vocabulary with the Dictionary App!</p>
                        <p>Search the dictionary and add words to your own collection to review and practice later as flashcards and vocab tests.</p>
                    </div>
                    <div className="navigation">
                        <h2>Navigation</h2>
                        <div>
                            <Link className="link" to="/">Search</Link>
                            <Link className="link" to="/collection">Your Collection</Link>
                            <Link className="link" to="/practice">Practice</Link>
                            <Link className="link" to="/create-account">Create Account</Link>
                        </div>
                    </div>
                </div>
                <div className="bottom">&copy; Copyright {new Date().getFullYear()}: <a href="http://www.andrewjohnweiss.com" target="_blank">Andrew John Weiss</a></div>
        </StyledFooter>
    )
}

export default withTheme(Footer);
