import React from 'react';

function SizedBox(props) {
    var cusStyle = {
        width : props.width ?? "0px",
        height : props.height ?? "0px"
    }
    return (
        <div style={cusStyle}></div>
    );
}

export default SizedBox;