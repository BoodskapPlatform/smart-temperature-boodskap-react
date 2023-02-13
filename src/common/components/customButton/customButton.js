import React from 'react';
import { Button } from '@mui/material';
import "./customButton.css"
import Loader from '../loader/loader';

function CustomButton(props) {
    var label = props.label ?? ""
    var onTap = props.onTap ? props.onTap : (e)=>{}
    const disabled = props.disabled ?? false
    return (
        <Button className='custom-button' style={{textTransform : "none",color:"white"}} variant={disabled ? 'disabled' : 'contained'} onClick={onTap}>{disabled ? 'Loading ...' : label}</Button>
    );
}

export default CustomButton;