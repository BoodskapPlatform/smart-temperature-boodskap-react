import {  Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import "./inputWidget.css"

function InputWidget(props) {
    var custype = props.type ?? "text"
    var placer = props.placer ?? ""
    var label = props.label
    var isPass = props.isPass ?? false    
    var isError = props.isError ?? false
    var errorTxt = props.errorTxt ?? ""
    var value = props.value
    var marginBottom = errorTxt ? "0px" : "20px" 
    var onChanged = props.onChanged ? props.onChanged : (e)=>{}


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <div className='input-wrapper'>
          {label ? <p>{label}</p> : null}
          <TextField
            className='input-widget'
            value={value}
            error = {isError}
            type={isPass ? showPassword ? 'text' : 'password' : custype}
            onChange={onChanged}
            style={{marginBottom}}
            helperText={isError ? errorTxt : ""}
            variant="outlined"
            placeholder={placer}
            size="small"
            InputProps={{
              endAdornment:!isPass ? null : <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            }}
          />
        </div>
    );
}

export default InputWidget;