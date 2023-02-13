import "./allDevices.css"
import { Link } from 'react-router-dom';
import { Bolt, Cached, FileCopyOutlined, OpacityTwoTone, Schedule, Thermostat, VideoLabel } from '@mui/icons-material';
import { Box, Stack, Table, TableHead, TableRow, TableBody, TableCell, Typography, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getDeviceDetailsAPI, getDeviceHistoryAPI, getDeviceListAPI, loading } from "../../redux/reducers/apiReducer";
import { checkDecimal, copyToClipboard } from "../../common/utilities/utils";
import moment from "moment";


// consist of device status list 
function AllDevices() {

    const dispatch = useDispatch()
    const allDeviceList = useSelector((state) => state.apiReducer.allDeviceList)

    const deviceSelect = (devId) => { // while changing the device

        dispatch(loading())
        dispatch(getDeviceDetailsAPI(devId))
        dispatch(getDeviceHistoryAPI({ "devid": devId }))

        const items = document.querySelectorAll('.each-dev');
        items.forEach(function (item) {
            item.classList.remove('active');
        });
        document.getElementById("device_" + devId).classList.add('active')
    }

    const refreshHandler = () => { // clicking the refresh button
        dispatch(getDeviceListAPI())
    }

    return (
        <>
            <Box className="dev-sts-div">
                <Typography variant='p' className='dev-txt'>Device Status</Typography>
                <Box className='dev-sts-refresh' onClick={refreshHandler}>
                    <Tooltip title="Refresh"><Cached className='refresh-icon' /></Tooltip>
                </Box>
            </Box>
            <Box className="all-dev-sts">
                {allDeviceList.length > 0 &&
                    allDeviceList.map((device, index) => {
                        return (<Link className={`each-dev ${index === 0 ? 'active' : ''}`} onClick={() => { deviceSelect(device.devid) }} id={`device_${device.devid}`} key={index}>
                            <Stack direction="row" className='dev-name-outer' spacing={2}>
                                <Box className="dev-name">
                                    <Box className="dev-name-inner">
                                        <VideoLabel className='dev-name-icon me-1' /> <Typography variant="span">{device.devid}</Typography>
                                        <Tooltip title="Copy Raw Data"><FileCopyOutlined className='dev-name-icon ms-1' onClick={() => { copyToClipboard(device.rawdata) }} /></Tooltip>
                                    </Box>
                                </Box>
                                <Box className="dev-sts-time">
                                    <Schedule className='schedule-icon' /> {moment(device.updated_time).fromNow()}
                                </Box>
                            </Stack>
                            <Table className='table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='table-cell'><Thermostat className='table-icon' />Temp</TableCell>
                                        <TableCell className='table-cell'><OpacityTwoTone className='table-icon' /> Hum</TableCell>
                                        <TableCell className='table-cell'><Bolt className='table-icon' /> Volt.</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='table-cell table-value'>{checkDecimal(device.temperature)}<sup>°</sup>C</TableCell>
                                        <TableCell className='table-cell table-value'>{checkDecimal(device.humidity)} g/m3</TableCell>
                                        <TableCell className='table-cell table-value'>{checkDecimal(device.voltage)} v</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Link>)
                    })}
            </Box>
        </>
    );
}

export default AllDevices;