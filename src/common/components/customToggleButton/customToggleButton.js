import { Box, Typography } from "@mui/material";
import { useState } from "react";
import "./customToggleButton.css"

function CustomToggleButton(props) {
    
    const [isOn,setIsOn] = useState(false)

    return (
        <Box className="toggle-box" onClick={()=> {setIsOn((isOn) => !isOn);props.trigger(!isOn)}}>
            <Box className="toggle-switch" style={{left:`${isOn ? "57px" : "5px"}`}}>
                {isOn ? "WEEK" : "TODAY"}
            </Box>
            <Typography variant='span' className={`toggle-first-txt ${!isOn ? "d-none" : ""}`}>TODAY</Typography>
            <Typography variant='span' className={`toggle-last-txt ${isOn ? "d-none" : ""}`}>WEEK</Typography>
        </Box>
    );
}

export default CustomToggleButton;