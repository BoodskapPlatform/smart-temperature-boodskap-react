import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApi, loginAction } from '../../common/utilities/utils';
import { platformApi } from '../../config/apiConfig';


const initialState = {
    email: "",
    password: "",
    emailErr: "",
    passwordErr: "",
    loginDisable: false
}

export const loginApi = createAsyncThunk('loginReducer/loginApi', async (navigate, { getState }) => {
    const state = getState().loginReducer;
    if (state.emailErr || state.passwordErr) { // Don't allow API call when username or password is not filled
        return
    }
    const response = await callApi(`/domain/login/${state.email}/${state.password}`, {}, "get", platformApi)
    if (!response.status) {
        return
    }
    console.log(response.result)
    loginAction(response.result)
    navigate("/dashboard", { replace: true }) // navigate page to dashboard
})


const loginReducer = createSlice({
    name: "loginReducer",
    initialState,
    reducers: {
        setEmail: (state, action) => { // remove username error while typing the username
            state.email = action.payload
            state.emailErr = ""
        },
        setPassword: (state, action) => { // remove password error while typing the username
            state.password = action.payload
            state.passwordErr = ""
        },
        submit: (state) => {
            state.loginDisable = true // disable login button

            if (!state.email.trim()) {
                state.emailErr = "please fill username" // show username error
                return
            }
            state.emailErr = ""

            if (!state.password.trim()) {
                state.passwordErr = "please fill password" // show password error
                return
            }
            state.passwordErr = ""
        }
    },
    extraReducers: {
        [loginApi.fulfilled]: (state) => {
            state.loginDisable = false // enable login button
        },
        [loginApi.rejected]: (state) => {
            state.loginDisable = false // enable login button
        }
    }
})

export const { setEmail, setPassword, submit } = loginReducer.actions
export default loginReducer.reducer