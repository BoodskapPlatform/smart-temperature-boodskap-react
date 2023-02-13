import { Battery1Bar, Battery2Bar, Battery3Bar, BatteryFull, Bolt, EmailOutlined, FileCopyOutlined, OpacityTwoTone, Schedule, Thermostat, VideoLabel } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import './deviceStatus.css';
import moment from 'moment';
import batteryCritical from '../../common/images/battery-0.png'
import batteryLow from '../../common/images/battery-1.png'
import batteryMedium from '../../common/images/battery-2.png'
import batteryGood from '../../common/images/battery-3.png'
import { useSelector } from 'react-redux';
import { copyToClipboard } from '../../common/utilities/utils';

// consist status of each device
function DeviceStatus() {
    const singleDeviceDetail = useSelector((state) => state.apiReducer.singleDeviceDetail.value)
    let battery_sts;
    let battery_img;

    if (singleDeviceDetail) {
        switch (singleDeviceDetail.battery_status) { // battery image and word change
            case 0:
                battery_sts = <><Battery1Bar className='dev-name-icon me-1' /> Critical</>;
                battery_img = batteryCritical;
                break;
            case 1:
                battery_sts = <><Battery2Bar className='dev-name-icon me-1' /> Low</>;
                battery_img = batteryLow;
                break;
            case 2:
                battery_sts = <><Battery3Bar className='dev-name-icon me-1' /> Normal</>;
                battery_img = batteryMedium;
                break;
            default:
                battery_sts = <><BatteryFull className='dev-name-icon me-1' /> Good</>;
                battery_img = batteryGood;
                break;
        }

        return (
            <Card sx={{ minWidth: 275 }}>
                <Box className="box-outer-title">
                    <Typography variant='p' className='box-title'>Device Status</Typography>
                    <Box className='dev-sts-time'>
                        <Schedule className='schedule-icon' /> {moment(singleDeviceDetail.updated_time).fromNow()}
                    </Box>
                </Box>
                <CardContent className='box-content'>
                    <Grid container sx={{ mb: 1 }}>
                        <Grid item xs={8} sx={{ pl: 0.5 }}>
                            <Typography className='dev-info-heading'>Device ID</Typography>
                            <Typography className='dev-info-value'> <VideoLabel className='dev-name-icon me-1' />{singleDeviceDetail.devid}</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Temperature</Typography>
                            <Typography className='dev-info-value'> <Thermostat className='dev-name-icon me-1' />{singleDeviceDetail.temperature}<sup>°</sup>C</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Humidity</Typography>
                            <Typography className='dev-info-value'> <OpacityTwoTone className='dev-name-icon me-1' />{singleDeviceDetail.humidity} grams/m3</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Last reported time</Typography>
                            <Typography className='dev-info-value'> <Schedule className='dev-name-icon me-1' /> {moment(singleDeviceDetail.updated_time).format("MM/DD/YYYY hh:mm:ss a")}</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Raw Data</Typography>
                            <Typography className='dev-info-value'> <EmailOutlined className='dev-name-icon me-1' />{singleDeviceDetail.rawdata} <FileCopyOutlined className='dev-name-icon' onClick={() => { copyToClipboard(singleDeviceDetail.rawdata) }} /></Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ pl: 0.5 }}>
                            <Typography className='dev-info-heading'>Voltage</Typography>
                            <Typography className='dev-info-value'> <Bolt className='dev-name-icon me-1' sx={{ color: "#e5a107" }} />{singleDeviceDetail.voltage}v</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Battery Status</Typography>
                            <Typography className='dev-info-value'> {battery_sts}</Typography>
                            <img src={battery_img} height="100" alt="battery" className='mt-3' />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default DeviceStatus;