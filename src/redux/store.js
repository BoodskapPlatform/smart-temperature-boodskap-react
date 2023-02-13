import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducers/apiReducer";
import loginReducer from "./reducers/loginReducer";




export const appStore = configureStore({
    reducer:{
        apiReducer,
        loginReducer
    }
})


