import { useEffect, useState } from 'react';
import { RangePicker } from "jalaali-react-date-picker";
import "jalaali-react-date-picker/lib/styles/index.css";
// import "./jalaali-date-picker.css"
import "./customDateRange.css"
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import PopUpMenu from '../popUpMenu/popUpMenu';
import { getRelativeTimeString } from './../../utilities/utils';
import { useDispatch } from 'react-redux';
import { getDeviceHistoryAPI } from '../../../redux/reducers/apiReducer';


function CustomDateRange({ chartType, isOpen, calendarState }) {

  const [open, setOpen] = useState(isOpen) // calendar open by clicking string
  const [showString, setshowString] = useState("Last 7 Days")
  const dispatch = useDispatch()

  useEffect(() => { // calendar state change while clicking calendar icon
    setOpen(isOpen)
  }, [isOpen])

  const [selectedRange, setSelectedRange] = useState([moment().subtract(6, 'days'), moment().endOf('day')]) // last 7 days selected in calendar defaultly



  const handleOnChange = (ranges) => {

    setshowString(getRelativeTimeString(ranges[0]["_d"], ranges[1]["_d"])) // calendar string change

    if (new Date(ranges[0]).getTime() !== new Date(ranges[1]).getTime()) {
      let bodyParams = {
        "fdate": moment(ranges[0]).format("YYYY-MM-DD"),
        "tdate": moment(ranges[1]).format("YYYY-MM-DD"),
        chartType
      }
      dispatch(getDeviceHistoryAPI(bodyParams)) // sending selected date to API 
      setOpen(false); // close the calendar
      calendarState(false); // calendar icon state change as calendar closed
      removeHighlightConstant() // to remove constant highlighted ranges
    }
  }

  const handledefaultRange = (type) => { // to change constant highlighted ranges

    let fdate, tdate;
    let sameValue = false
    let rangeBox = document.querySelectorAll(".default-range")
    rangeBox.forEach(function (item) {
      if (item.classList.contains('active') && item.innerHTML === type.innerHTML) { // to find previous and now selected value is same
        sameValue = true
      }
    });

    if (sameValue) {
      setOpen(false);
      calendarState(false)
      return
    }

    switch (type.innerHTML) { // to pass the date object to API

      case "Today":
        fdate = moment()
        tdate = moment()
        break;

      case "Yesterday":
        fdate = moment().subtract(1, 'days')
        tdate = moment().subtract(1, 'days')
        break;

      case "Last Week":
        fdate = moment().subtract(1, 'week').startOf('week')
        tdate = moment().subtract(1, 'week').endOf('week')
        break;

      case "Last 7 Days":
        fdate = moment().subtract(6, 'days')
        tdate = moment().endOf('day')
        break;

      case "Last 30 Days":
        fdate = moment().subtract(29, 'days')
        tdate = moment()
        break;

      case "This Month":
        fdate = moment().startOf('month')
        tdate = moment().endOf('month')
        break;

      default:
        fdate = moment().subtract(1, 'month').startOf('month')
        tdate = moment().subtract(1, 'month').endOf('month')
        break;
    }

    setSelectedRange([fdate, tdate]) // setting the date range picker value to default selcted ranges

    let bodyParams = {
      "fdate": fdate.format("YYYY-MM-DD"),
      "tdate": tdate.format("YYYY-MM-DD"),
      chartType
    }

    dispatch(getDeviceHistoryAPI(bodyParams))

    setshowString(type.innerHTML)
    setOpen(false);
    calendarState(false)
    removeHighlightConstant()
    type.classList.add("active"); // highlight the selected constant ranges
  }

  // to remove constant highlighted ranges
  const removeHighlightConstant = () => {
    let rangeBox = document.querySelectorAll(".default-range")
    rangeBox.forEach(function (item) {
      item.classList.remove('active');
    });
  }

  const disabledDates = [
    "2023/02/01",
    "2023/02/02",
    "2023/02/03"
  ];


  // date range picker
  const dateRangeJSX = <RangePicker locale="en" value={selectedRange} disabledDates={(c) => c > moment()} onChange={handleOnChange} />

  // constant ranges
  const defaultRange = (
    <Box className="default-range-box">
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Today</Typography>
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Yesterday</Typography>
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Last Week</Typography>
      <Typography className='default-range active' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Last 7 Days</Typography>
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Last 30 Days</Typography>
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>This Month</Typography>
      <Typography className='default-range' onClick={(e) => { handledefaultRange(e.target) }} variant='h6'>Last Month</Typography>
    </Box>
  )

  const popupItems = <Box className="datepicker-outer">{defaultRange}{dateRangeJSX}</Box>

  return (
    <PopUpMenu open={open} popupitems={popupItems} placement="top" className="date-picker-popup">
      <Typography variant='span' className='date-range-picker-string' onClick={() => { setOpen((ope) => !ope) }}>{showString}</Typography>
    </PopUpMenu>
  );

}

export default CustomDateRange;