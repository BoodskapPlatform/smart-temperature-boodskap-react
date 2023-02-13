import axios from "axios";
import Prefs from "../common/utilities/prefs";
import { devConfig } from "./config";

const domainKey = devConfig.domainKey.toLowerCase()

const platformApiInstance = axios.create({
    baseURL: devConfig.platformUrl,
    headers:{
        'Content-Type': 'application/json',
    }
})

platformApiInstance.interceptors.request.use(function (config) {
    var token = Prefs.getToken();
    if(config.url.includes("/domain/login/")){
        return config
    }
    config.headers['TOKEN'] =  token ?? '';
    return config;
});

const microApiInstance = axios.create({
    baseURL: devConfig.platformUrl+'micro/service/call/post/'+domainKey+'/'+devConfig.slugName,
    headers:{
        'Content-Type': 'application/json',
    }
})

// This intercepts every requests and send the TOKEN in header if available
microApiInstance.interceptors.request.use(function (config) {
    var token = Prefs.getToken();
    config.headers['TOKEN'] =  token ?? '';
    return config;
});


export const microApi = microApiInstance
export const platformApi = platformApiInstance