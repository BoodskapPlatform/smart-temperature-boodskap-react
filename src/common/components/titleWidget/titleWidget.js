import React from 'react';

function TitleWidget(props) {
    const title = props.title
    const icon = props.icon
    
    return (
        <div className="d-flex flex-row align-items-center">
          {icon}
          <h5 className='ms-2'>{title}</h5>
        </div>
      );
}

export default TitleWidget;