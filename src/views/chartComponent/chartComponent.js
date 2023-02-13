import { Bolt, CalendarMonthOutlined, OpacityTwoTone } from '@mui/icons-material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import ReactEcharts from "echarts-for-react";
import CustomDateRange from '../../common/components/customDateRange/customDateRange';

// consist of chart history of device
function ChartComponent({ heading, icon, option }) {

  const [calendarOpen, setCalendarOpen] = useState(false) // to open / close the calendar while clicking calendar icon

  return (
    <Card sx={{ mt: 3 }}>
      <Box className="box-outer-title" sx={{ p: 0 }}>
        <Box className="d-flex align-items-center" sx={{ pl: 1.5, mr: 1 }}>
          {icon === "tempHum" ? <OpacityTwoTone sx={{ fontSize: '17px', mr: 1 }} /> : <Bolt sx={{ fontSize: '17px', mr: 1 }} />}
          <Typography variant='p' className='box-title'>{heading}</Typography>
        </Box>
        <Box className='calendar-box'>
          <CalendarMonthOutlined sx={{ fontSize: '18px', mx: 1, cursor: 'pointer' }} onClick={() => { setCalendarOpen((state) => !state) }} />
          <CustomDateRange chartType={icon} isOpen={calendarOpen} calendarState={setCalendarOpen} />
        </Box>
      </Box>
      <CardContent>
        <ReactEcharts option={option} />
      </CardContent>
    </Card>
  );
}

export default ChartComponent;


