import React from 'react';
import PropTypes from 'prop-types';
import { InverseButton, StyledButton } from './styles/components/button';

export default function Button(props) {
    if (props.inverse) {
        return (
            <InverseButton>
                {props.children}
            </InverseButton>
        )
    } else {
        return (
            <StyledButton onClick={props.handleClick ? props.handleClick.bind(this) : null }>
                {props.children}
            </StyledButton>
        )
    }
}

Button.propTypes = {
    inverse: PropTypes.bool,
    handleClick: PropTypes.func,
}
