import React from 'react';
import { APPNAME } from '../../utilities/globals';

function Logo(props) {
    return (
        <h1 style={{fontSize: `${props.size ?? 32}px`}}>{APPNAME}</h1>
    );
}

export default Logo;