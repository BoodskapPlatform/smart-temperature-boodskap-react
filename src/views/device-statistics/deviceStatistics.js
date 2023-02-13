import { Thermostat, OpacityTwoTone } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import './deviceStatistics.css';
import temperature from '../../common/images/temperature.png'
import humidity from '../../common/images/humidity.png'
import CustomToggleButton from '../../common/components/customToggleButton/customToggleButton';
import { useDispatch, useSelector } from 'react-redux';
import { checkDecimal } from '../../common/utilities/utils';
import { changeToggle } from '../../redux/reducers/apiReducer';

// consist temperature , humidity statics of each device
function DeviceStatistics({ name }) {

    const dispatch = useDispatch()

    const deviceDetail = useSelector((state) => state.apiReducer.singleDeviceDetail)
    const deviceStatsData = useSelector((state) => state.apiReducer.deviceStatsData)
    let current, iconWidget, type;


    if (Object.keys(deviceStatsData).length) {
        if (name === "Temperature") {
            iconWidget = <Thermostat className='dev-name-icon me-1' />
            current = <>{deviceDetail.value.temperature} <sup>°</sup>C</>
            type = "t"
        } else {
            iconWidget = <OpacityTwoTone className='dev-name-icon me-1' />
            current = <>{deviceDetail.value.humidity} <sub className='unit'>grams/m3</sub></>
            type = "h"
        }


        return (
            <Card sx={{ minWidth: 275 }}>
                <Box className="box-outer-title">
                    <Typography variant='p' className='box-title'>{name} Statistics</Typography>
                </Box>
                <CardContent className='box-content'>
                    <Grid container>
                        <Grid item xs={8} sx={{ pl: 0.5 }}>
                            <Typography className='dev-info-heading'>Current {name}</Typography>
                            <Typography className='current-statistics-value'>{current}</Typography>
                            <CustomToggleButton trigger={(isOn) => { dispatch(changeToggle(isOn)) }} />
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Avg. {name}</Typography>
                            <Typography className='dev-info-value'> {iconWidget} {checkDecimal(deviceStatsData["avg" + type]["value"])}<sup>°</sup>C</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Min. {name}</Typography>
                            <Typography className='dev-info-value'> {iconWidget} {checkDecimal(deviceStatsData["min" + type]["value"])}<sup>°</sup>C</Typography>
                            <Typography className='dev-info-heading' sx={{ mt: 1.5 }}>Max. {name}</Typography>
                            <Typography className='dev-info-value'> {iconWidget} {checkDecimal(deviceStatsData["max" + type]["value"])}<sup>°</sup>C</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            {
                                name === "Temperature" ? (<Box className="statistics-img">
                                    <Box className="temp-size"></Box>
                                    <img src={temperature} alt="temperature" height="100%" className='mt-2' />
                                </Box>)
                                    : (<img src={humidity} alt="humidity" className='mt-5' />)
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default DeviceStatistics;