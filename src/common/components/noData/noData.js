import React from 'react';
import "./noData.css"

function NoData(props) {
    var height = props.height ?? "100%"
    return (
        <div className='noData' style={{height:height}}>
            <p>No Data Found</p>
        </div>
    );
}

export default NoData;