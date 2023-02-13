import React from 'react';
import { CircularProgress } from '@mui/material';
import "./loader.css"

function Loader(props) {
    var height = props.height ?? "100%"
    return (
        <div className='loader' style={{height:height}}>
            <CircularProgress  size={18}/>
            <p>Loading</p>
        </div>
    );
}

export default Loader;