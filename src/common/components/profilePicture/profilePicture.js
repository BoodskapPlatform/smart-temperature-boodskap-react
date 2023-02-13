import { Avatar } from '@mui/material';
import React from 'react';
import avatar from "./../../../assets/images/boodskap-logo.png"
import { getimageUrl } from '../../utilities/utils';

function ProfilePicture(props) {

    var imageId = props.imageId 
    var size = props.size  ?? 50 

    return (
        <Avatar style={{width:`${size}px`,height:`${size}px`,marginRight:"10px"}} src={getimageUrl(imageId)}  />
    );
}

export default ProfilePicture;