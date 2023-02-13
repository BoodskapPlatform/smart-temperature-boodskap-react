import Header from '../../common/components/header/header';
import Footer from '../../common/components/footer/footer';
import "./layout.css"
import { Box } from '@mui/material';
function Layout({child}) {
    return (
        <Box className='app-layout'>
            <Header />
            {child}
            <Footer />
        </Box>
    );
}

export default Layout;