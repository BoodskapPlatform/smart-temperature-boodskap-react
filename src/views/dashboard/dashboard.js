import { Cached, Info, Thermostat } from '@mui/icons-material';
import { Button, Grid, Stack, Typography } from '@mui/material';
import './dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDeviceDetailsAPI, getDeviceHistoryAPI, getDeviceListAPI, loading } from '../../redux/reducers/apiReducer';
import noData from '../../common/images/nodata-img.png'
import { Box } from '@mui/system';
import AllDevices from '../all-devices/allDevices';
import DeviceStatus from '../device-status/deviceStatus';
import DeviceStatistics from '../device-statistics/deviceStatistics';
import ChartComponent from '../chartComponent/chartComponent';

// this is the main UI component
function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => { // call device list API
    dispatch(getDeviceListAPI())
  }, [dispatch])

  const tempHumChart = useSelector((state) => state.apiReducer.tempHumChart)
  const voltageChart = useSelector((state) => state.apiReducer.voltageChart)
  const singleDeviceDetail = useSelector((state) => state.apiReducer.singleDeviceDetail)

  const deviceStsRefresh = () => {
    dispatch(loading())
    dispatch(getDeviceDetailsAPI(singleDeviceDetail.value.devid))
    dispatch(getDeviceHistoryAPI({ "devid": singleDeviceDetail.value.devid }))
  }

  return (
    Object.keys(singleDeviceDetail).length ?
      <Box className="main-container">
        <Typography variant='h5' className='inner-header'>Live Dashboard</Typography>
        <Grid container>
          <Grid item xs={12} sm={4} md={2}>
            <AllDevices />
          </Grid>

          <Grid item xs={12} sm={8} md={10} sx={{ pl: 1.5 }} className="scroll-content">

            <Stack direction="row" spacing={2} className="heading-outer">
              <Box className="heading"><Thermostat fontSize='large' />Device <Typography variant='span' className='device-heading'>{singleDeviceDetail.value.devid}</Typography></Box>
              <Button size="small" className="refresh-btn" variant="contained" onClick={deviceStsRefresh}><Cached className='refresh-icon' /> Refresh</Button>
            </Stack>

            <Grid container spacing={2}>
              <Grid item sm={12} md={4} className="card-outer">
                <DeviceStatus />
              </Grid>
              <Grid item sm={12} md={4} className="card-outer">
                <DeviceStatistics name="Temperature" />
              </Grid>
              <Grid item sm={12} md={4} className="card-outer">
                <DeviceStatistics name="Humidity" />
              </Grid>
            </Grid>

            <ChartComponent heading="Temperature & Humidity History" icon="tempHum" option={tempHumChart} />
            <ChartComponent heading="Device Voltage History" icon="voltage" option={voltageChart} />
          </Grid>
        </Grid>
      </Box> : <Box className="no-data">
        <img src={noData} alt="nodata" height="300" />
        <Typography variant='p' className='no-data-head'>Connect Your First Device</Typography>
        <Typography variant='p' className='no-data-inner'> <Info fontSize='small' /> No Data Available</Typography>
      </Box>
  );
}

export default Dashboard;