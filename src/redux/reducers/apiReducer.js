import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { devConfig } from "../../config/config";
import { callApi, findMyGMT, showToast } from '../../common/utilities/utils';
import { microApi } from "../../config/apiConfig";
import moment from "moment";
import _ from "underscore";
import { Close } from "@mui/icons-material";

const chartOption = { // common chart option
    tooltip: {
        trigger: 'axis'
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { readOnly: true },
            magicType: { type: ["line", "bar"] },
            saveAsImage: {},
        },
    },
    dataZoom: [
        {
            type: "inside",
            start: 0,
            end: 90,
        },
        {
            start: 0,
            end: 90,
        },
    ]
}

const initialState = {
    allDeviceList: {},
    singleDeviceDetail: {},
    deviceStatsData: {},
    browserGMT: findMyGMT(),
    isWeek: true,
    voltageChart: {},
    tempHumChart: {},
    isLoading: true
}

export const getDeviceListAPI = createAsyncThunk('apiReducer/getDeviceListAPI', async (_, thunkAPI) => {
    const response = await callApi(`/list`, { "domain_key": devConfig.domainKey }, "post", microApi)
    if (response.result.success) { // call 1st device details and history API
        thunkAPI.dispatch(getDeviceDetailsAPI(response.result.values[0]["devid"]))
        thunkAPI.dispatch(getDeviceHistoryAPI({
            "devid": response.result.values[0]["devid"]
        }))
        return response.result.values;
    } else { // Micro API error
        showToast(<><Close sx={{ mr: 1 }} />Something Went Wrong !</>, { position: "TOP_CENTER" })
    }
})

export const getDeviceDetailsAPI = createAsyncThunk('apiReducer/getDeviceDetailsAPI', async (deviceId, thunkAPI) => {
    const gmt = thunkAPI.getState().apiReducer.browserGMT
    const response = await callApi(`/status`, { "devid": deviceId, tz: gmt }, "post", microApi)
    return response;
})

export const getDeviceHistoryAPI = createAsyncThunk('apiReducer/getDeviceHistoryAPI', async (payload, thunkAPI) => {
    let chartType = "all";
    let bodyParams = payload
    bodyParams["tz"] = thunkAPI.getState().apiReducer.browserGMT
    bodyParams["sort"] = "desc"
    bodyParams["size"] = 100

    if (bodyParams.hasOwnProperty("fdate")) { // called by changing the calendar of the chart
        bodyParams["devid"] = thunkAPI.getState().apiReducer.singleDeviceDetail["value"]["devid"]
        chartType = bodyParams["chartType"]
        delete bodyParams["chartType"]
    } else { // called from getDeviceListAPI
        bodyParams["fdate"] = moment().subtract(6, 'days').format("YYYY-MM-DD")
        bodyParams["tdate"] = moment().format("YYYY-MM-DD")
    }

    const response = await callApi(`/between`, bodyParams, "post", microApi)
    let output = {
        chartType,
        result: response
    }
    return output;
})

const apiReducer = createSlice({
    name: "API Reducer",
    initialState,
    reducers: {
        changeToggle: (state, { payload }) => { // Day / Week toogle change of device details
            state.isToday = payload
            if (payload) {
                state.deviceStatsData = state.singleDeviceDetail.week
            } else {
                state.deviceStatsData = state.singleDeviceDetail.today
            }

        },
        loading: (state) => { // pace loader
            state.isLoading = true
        }
    },
    extraReducers: {
        [getDeviceListAPI.fulfilled]: (state, { payload }) => {
            return { ...state, allDeviceList: payload }
        },
        [getDeviceDetailsAPI.fulfilled]: (state, { payload }) => {
            if (payload.result.success) {
                return { ...state, singleDeviceDetail: payload.result, deviceStatsData: state.isWeek ? payload.result.week : payload.result.today }
            } else { // Micro API error
                showToast(<><Close sx={{ mr: 1 }} />Something Went Wrong !</>, { position: "TOP_CENTER" })
            }
        },
        [getDeviceHistoryAPI.fulfilled]: (state, { payload }) => {
            if (payload["result"]["result"]["success"]) {

                const { values } = payload["result"]["result"] // destructuring the object

                if (payload["chartType"] === "all") { // called from getDeviceListAPI
                    let voltageChart = chartValueGenerate(values, 'voltage')
                    let tempHumChart = chartValueGenerate(values, 'tempHum')
                    return { ...state, voltageChart, tempHumChart, isLoading: false }
                }

                if (payload["chartType"] === "voltage") { // when voltage history calendar is changed
                    let voltageChart = chartValueGenerate(values, 'voltage')
                    return { ...state, voltageChart, isLoading: false }
                }

                if (payload["chartType"] === "tempHum") { // when temperature & humidity history calendar is changed
                    let tempHumChart = chartValueGenerate(values, 'tempHum')
                    return { ...state, tempHumChart, isLoading: false }
                }
            } else { // Micro API error
                showToast(<><Close sx={{ mr: 1 }} />Something Went Wrong !</>, { position: "TOP_CENTER" })
            }
        },
    }
})


const chartValueGenerate = (list, type) => { // forming object to show chart
    let option = JSON.parse(JSON.stringify(chartOption))
    let updated_ts_arr = _.pluck(list, "updated_time");
    let yAxisArr = [], series = []
    let yAxis = {}
    updated_ts_arr.forEach(element => {
        yAxisArr.push(moment(element).format('MM/DD/YYYY hh:mm:ss a'));
    });
    if (type === "voltage") {
        yAxis = {
            axisLabel: {
                formatter: "{value} V",
            },
        }
        series = [
            {
                name: "Voltage",
                type: "line",
                data: _.pluck(list, "voltage"),
            },
        ]
    } else {
        yAxis = {
            type: "value",
            boundaryGap: [0, "100%"],
            axisLabel: {
                formatter: "{value} °C",
            },
        }
        series = [
            {
                name: "Temperature",
                type: "line",
                data: _.pluck(list, "temperature"),
            },
            {
                name: "Humidity",
                type: "line",
                data: _.pluck(list, "humidity"),
            },
        ]
    }

    let chartObj = {
        xAxis: {
            data: yAxisArr,
        },
        yAxis,
        series
    }
    option = {
        ...option,
        ...chartObj
    }
    return { ...option, ...chartObj }
}


export const { changeToggle, loading } = apiReducer.actions
export default apiReducer.reducer
