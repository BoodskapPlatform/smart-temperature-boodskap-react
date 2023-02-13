import { FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, Link, Typography } from "@mui/material";
import "./login.css"
import logo from "../../common/images/logo.png"
import boodskap from "../../common/images/boodskap-logo.png"
import { Box } from "@mui/system";
import { AccountCircle, Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import CustomButton from './../../common/components/customButton/customButton';
import { loginApi, setEmail, setPassword, submit } from '../../redux/reducers/loginReducer';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import Prefs from "../../common/utilities/prefs";
import moment from "moment";


// consist of login page
function Login() {
  var hasSession = Prefs.getToken() !== ""

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false); // passowrd show / hide
  const emailErr = useSelector((state) => state.loginReducer.emailErr)
  const passwordErr = useSelector((state) => state.loginReducer.passwordErr)
  const loginDisable = useSelector((state) => state.loginReducer.loginDisable)

  if (hasSession) { // redirect to dahboard if login has already done
    return <Navigate to="/dashboard" replace={true}></Navigate>
  }

  return (
    <Grid container className="outer-container">
      <Grid item md={8} sx={{display:{ xs: "none", md: "block" } }} className="login-bg">
        <Box className="login-inner-bg">
          <Typography variant="p" className="logo-txt">Dragino <Typography variant="span" className="logo-span">LHT65</Typography></Typography>
          <Typography variant="p" className="login-txt-inner">Climate And Weather Tracking With Our Smart Temperature Monitoring</Typography>
          <Typography variant="p" className="login-txt-span">Features Include Google Maps-Powered Guidance To Find A Car Park, As Well As Providing Detailed, Live Information Around Hours And Availability, Tariffs, Directions And Distance. By Harnessing The Power Of SmartCloud, We Can Show Real-Time Location And Guidance Information From Each Site Our Sensors Are Installed In.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ px: 5, pt: 5 }}>
        <Box className="header-links">
          <Link href="https://calendly.com/boodskap/demo" target="_blank"><Typography variant="span">Demo</Typography></Link>
          <Link href="https://developer.boodskap.io" target="_blank"><Typography variant="span" sx={{ mx: 3 }}>Help</Typography></Link>
          <Link href="https://boodskap.io/contact-us" target="_blank"><Typography variant="span">Supporty 24/7</Typography></Link>
        </Box>
        <img src={logo} alt="logo" height="50" className="logo-img" />
        <Box className="login-head">
          <Typography variant="p" className="login-head-text">Account</Typography> <Typography variant="span">Login</Typography>
        </Box>
        <Typography variant="span" className="caption-text">Enter the account details below</Typography>
        <Box sx={{ mt: 3, mb: 5 }}>
          <FormControl fullWidth variant="standard" error={emailErr ? true : false}>
            <InputLabel>Username</InputLabel>
            <Input type='text'
              onChange={(e) => { dispatch(setEmail(e.target.value)) }}
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            {emailErr && <FormHelperText error>{emailErr}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mt: 4 }} variant="standard" error={passwordErr ? true : false}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              onChange={(e) => { dispatch(setPassword(e.target.value)) }}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => { setShowPassword((show) => !show) }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordErr && <FormHelperText error>{passwordErr}</FormHelperText>}
          </FormControl>

          <Box sx={{ my: 5 }}>
            <CustomButton label="LOGIN" disabled={loginDisable} onTap={(e) => { dispatch(submit()); dispatch(loginApi(navigate)) }} />
          </Box>

          <Box className="terms-div">
            <Link href="https://boodskap.io/terms-conditions" target="_blank"><Typography variant="span" sx={{ mr: 1 }}>Terms & Conditions</Typography></Link>  |
            <Link href="https://boodskap.io/privacy-policy" target="_blank"><Typography variant="span" sx={{ ml: 1 }}>Privacy Policy</Typography></Link>
          </Box>
          <Box className="copyright-div">
            <Copyright className="copyright-icon" />
            <Typography variant="span" sx={{ mx: 0.5 }}>{moment().format("YYYY")}</Typography>
            <Typography variant="span">All rights reserved.</Typography>
          </Box>

          <Box className="powered-by">
            <Typography variant="span">Powered by</Typography>
            <img src={boodskap} alt="company-logo" height="30" />
          </Box>

        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;