import React from 'react';
import "./popUpMenu.css"
import { Popover } from 'antd';
import { Box } from '@mui/material';

function PopUpMenu(props) {


    const open = props.open ?? false
    const popupitems = props.popupitems
    const placement = props.placement ?? "bottomRight"

    return (
        <Popover style={{ backgroundColor: "transparent" }}
            open={open}
            content={
                <Box className='popup-actions'>
                    {popupitems}
                </Box>
            }
            placement={placement}
            trigger="click"
        >
            {props.children}
        </Popover>
    );
}

export default PopUpMenu;