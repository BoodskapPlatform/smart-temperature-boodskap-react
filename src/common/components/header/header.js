import { AccountCircleOutlined, Dashboard, ElectricBoltOutlined, Logout, MenuRounded, NotificationsActiveOutlined, Speed } from '@mui/icons-material';
import { Box, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDeviceListAPI, loading } from '../../../redux/reducers/apiReducer';
import logo from "../../images/logo.png"
import { logOutAction } from '../../utilities/utils';
import PopUpMenu from '../popUpMenu/popUpMenu';
import SizedBox from '../sizedBox/sizedBox';
import "./header.css"


function Header() {
    const [isopen, setIsopen] = useState(false);
    const [logoutMenu, setLogoutMenu] = useState(false)

    const dispatch = useDispatch()


    const toggleDrawer = (open) => (event) => {
        if (event && event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setIsopen(open);
    };

    const leftMenu = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)} >
            <List className='left-menu'>
                <Link href="https://showcase.boodskap.io">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Showcase Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem disablePadding onClick={() => { dispatch(loading()); dispatch(getDeviceListAPI()) }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Speed />
                        </ListItemIcon>
                        <ListItemText primary="Live Dashboard" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const popupItems = [
        {
            name: "Logout",
            icon: <Logout fontSize='small' style={{ fontSize: "16px", color: "var(--text-primary)" }} />,
            onTap: (e) => {
                logOutAction()
            }
        }
    ]
    const logoutPopup = popupItems.map((ele) => (
        <div key={ele.name} className='popup-action-item' onClick={ele.onTap}>
            {ele.icon}
            <SizedBox width="5px" />
            {ele.name}
        </div>
    ))
    return (
        <Box>
            <Grid container className='header'>
                <Grid item xs={10} sm={6} md={8}>
                    <Stack direction="row" spacing={2}>
                        <MenuRounded sx={{ mr: 4, cursor: "pointer" }} onClick={toggleDrawer(true)} />
                        <Box onClick={toggleDrawer(true)} className="d-flex align-items-center" sx={{ cursor: "pointer" }}><img src={logo} height="28" alt="project-logo" /><Typography variant='span' className='theme-txt'>LHT65</Typography></Box>
                    </Stack>
                </Grid>
                <Grid item xs={2} sm={6} md={4} className="text-end">
                    <Box className="d-none d-sm-block">
                        <NotificationsActiveOutlined color='info' className='c-pointer' sx={{ mr: 3 }} />
                        <PopUpMenu open={logoutMenu} popupitems={logoutPopup}>
                            <Box className='c-pointer' sx={{ display: 'inline' }} onClick={(e) => { setLogoutMenu((open) => !open) }}><AccountCircleOutlined color='warning' /> Showcase Demo</Box></PopUpMenu>
                        <ElectricBoltOutlined className='bolt-icon' sx={{ mx: 3 }} />
                    </Box>
                    <Logout className="d-inline d-sm-none" />
                </Grid>
            </Grid>
            <SwipeableDrawer className="left-drawer"
                open={isopen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {leftMenu()}
            </SwipeableDrawer>
        </Box>
    );
}

export default Header;