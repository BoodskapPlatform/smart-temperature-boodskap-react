import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./404.css"

// consist of 404 UI
function PageNotFound() {
    return (
        <Box class="container" id="noContentPage">
            <Grid container spacing={2}>
                <Grid item xs={6} className="align-self-center">
                    <Box className="four_zero_four_bg" />
                </Grid>
                <Grid item xs={6} className="align-self-center">
                    <Box>
                        <Typography variant='h1'>404</Typography>
                        <Typography variant='h2'>UH OH! You're lost.</Typography>
                        <Typography variant='p' className='content'>The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.</Typography>
                    </Box>
                    <Link to="/dashboard" className="redirect"><Button className='btn green'>HOME</Button></Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PageNotFound;