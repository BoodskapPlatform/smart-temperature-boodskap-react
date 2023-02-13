import React from 'react';
import { Image } from 'react-bootstrap';
import boodskapLogo from "./../../../assets/images/boodskap-logo.png"
import "./poweredBy.css"

function PoweredBy(props) {
    return (
        <div className='powered-by'>
            <p>Powered by</p>
            <Image src={boodskapLogo}></Image>         
        </div>
    );
}

export default PoweredBy;