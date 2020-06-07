import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StyledImage, LogoContainer } from './styles/components/logo';


export default function Logo(props) {
    const { theme } = props
    return (
        <LogoContainer>
            <StyledImage 
                src={require(`../images/${theme}.svg`)} 
                alt="logo"
            />
            <div className="overlay"></div>
            <Link to="/">
                <h1>Dictionary App</h1>
            </Link>
        </LogoContainer>
    )
}

Logo.propTypes = {
    theme: PropTypes.string
}
