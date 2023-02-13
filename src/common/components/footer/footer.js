import { Box } from '@mui/material';
import './footer.css'
import logo from "../../images/boodskap-logo.png"
import moment from 'moment';

function Footer() {
    const currentYear = moment().format("YYYY")

    return (
        <Box className='footer'>
            <div>© <span>{currentYear}</span> . All rights reserved.</div>
            <div><span>Powered By</span><img src={logo} alt="company-logo" height="30" /></div>
        </Box>
    );
}

export default Footer;