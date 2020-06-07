import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './styles/components/themeItem';

export default function ThemeItem(props) {
    return (
        <Item>
           <div className="colors">
               <div style={{ height: "20px", width: "20px", borderRadius: "50%", marginRight: "5px", backgroundColor: props.primary }}></div>
               <div style={{ height: "20px", width: "20px", borderRadius: "50%", marginRight: "5px", backgroundColor: props.secondary }}></div>
               <div style={{ height: "20px", width: "20px", borderRadius: "50%", backgroundColor: props.tertiary }}></div>
           </div>
           <div className="name">
               <p>{props.name}</p>
           </div> 
        </Item>
    )
}

ThemeItem.propTypes = {
    name: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,

}
