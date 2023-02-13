
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prefs from './prefs';
import swal from 'sweetalert';
import { format } from 'date-fns';
import {platformApi} from '../../config/apiConfig';
import { devConfig } from './../../config/config';
import copy from "copy-to-clipboard";
import { Done} from '@mui/icons-material';




export const showToast = (msg, args = {}) => {

  args['position'] = args['position'] ? toast.POSITION[args['position']] : toast.POSITION["BOTTOM_CENTER"]
  args['err'] = args['err'] ?? false
  args['success'] = args['success'] ?? false


  var options = {
    position: args.position,
    hideProgressBar: true,
    draggable: true,
    theme:"dark",
    autoClose: 1000,
    transition:Flip
  }

  if (args.success) {
    toast.success(msg, options)
    return
  }

  if (args.err) {
    toast.error(msg, options)
    return
  }

  toast(msg, options,)
}


export const getimageUrl = (id) => {
  var token = Prefs.getToken();
  return id ? `${devConfig.platformUrl}/files/download/${token}/${id}` : null;
}

export const showDialog = (msg, options = {}) => {
 
  var acceptFn = options.acceptFn
  var rejectFn = options.rejectFn

  swal(msg, {
    buttons: ["No", "Yes"],
  }).then((value) => {
    if (value) {
      acceptFn()
    } else {
      rejectFn()
    }
  });
}


export const formatDate = (milli, onlyDate = false) => {
  var date = new Date(milli)
  if (onlyDate) {
    return (format(date, 'dd/MM/yyyy'))
  }
  return (format(date, 'dd/MM/yyyy hh:mm a'))

}


export const capitalizeFirstLetter = (str) => {
  try {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  } catch (e) {
    return '';
  }
}

export const renameKey = (arrayOfObj, oldKey, newKey) => {
  
  var newArrayOfObj = arrayOfObj.map(({
    [oldKey]: renamedKey,
    ...rest
  }) => ({
    [newKey]:renamedKey,
    ...rest
  }));

  return newArrayOfObj
}

export const checkDecimal = (val) => {
  try{
    if(val){
      return val.toFixed(2);
    }
    return val;
  }catch(e){
    return "N/A";
  }
}

export const findMyGMT = () =>{
  try{
      var date = new Date().toString();
      var dateArray = date.split(' ');
      var res = dateArray.find((val)=>{
          return val.includes("GMT");
      });
      var gmt_txt = res.split('').slice(3);
      var final = gmt_txt[0]+gmt_txt[1]+gmt_txt[2]+":"+gmt_txt[3]+gmt_txt["4"];
      return final;
  }catch(e){
      console.error(e);
  }
}

export const copyToClipboard = (content) => {
  copy(content);
  showToast(<><Done sx={{mr:1}} />Raw Data Copied successfully</>, { position: "TOP_CENTER" })
}

export const getRelativeTimeString = (startDate, endDate) => {
  // const diffTime = Math.abs(new Date() - startDate);
  // const daysDifference = (diffTime / (1000 * 60 * 60 * 24));

  // if (daysDifference < 1) {
  //   return "Today";
  // } else if (daysDifference >= 1 && daysDifference < 2) {
  //   return "Yesterday";
  // } else if (daysDifference >= 2 && daysDifference <= 7) {
  //   return "This Week";
  // } else if (daysDifference > 7 && daysDifference <= 14) {
  //   return "Last Week";
  // } else if (daysDifference > 14 && daysDifference <= 14) {
  //   return "This Month";
  // } else if (endDate.getFullYear() === startDate.getFullYear()) {
  //   return "Last Month";
  // } else {
    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
  // }
}

export const logOutAction = () => {
  Prefs.setitem("USERDATA", "")
  Prefs.setitem("TOKEN", "")
  Prefs.setitem("ISLOGIN", false)
  Prefs.setitem("USERID", "")
  Prefs.setitem("DOMAINKEY", "")
  Prefs.setitem("APIKEY", "")
  window.history.replaceState(null, '', "/login");
  window.history.go("/login")
}


export const loginAction = (data) => {
  data['user'] && Prefs.setitem("USERDATA" , JSON.stringify(data['user']))
  data['token'] && Prefs.setitem("TOKEN" , data['token'])
  Prefs.setitem("ISLOGIN" , true)
  data['user'] && Prefs.setitem("USERID" , data.user.email)
  data['domainKey'] && Prefs.setitem("DOMAINKEY" , data['domainKey'])
  data['apiKey'] && Prefs.setitem("APIKEY" , data['apiKey'])
}


export const timeSince = (milli) => {
  var date = new Date(milli)

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


export const showAlert = async (tit, desc, type = "success") => {
  await swal(tit, desc, type);
}


export const checkEmail = (email) =>{
  var regEx = /\S+@\S+\.\S+/
  return regEx.test(email)
}


export const callApi = async (endpoint , body = {} , type = 'post', axiosInstance = platformApi) => {
  var send = {
    status: false,
    message: ""
  }
  try {
    var res = await requestMethod(endpoint , body , type , axiosInstance)
    if(res.status === 401){
      if(endpoint.includes("domain/login")){
        await showAlert("Invalid Credentials","Kindly check your username / password","error")
        return
      }
      await showAlert("Unauthorized","Kindly login again to proceed","error")
      logOutAction()
      return
    }
    if (res.status !== 200) {
      showAlert(res.status.toString(),res.statusText,"error")
      send.message = `Api call failed with status ${res.status}`
      return send
    }
    send.status = true
    send.message = "Api called successfully"
    send.result = res.data

  } catch (error) {
    showAlert("Error","Something Went Wrong !","error")
    send.message = `Api call error - ${error}`
    send.status = false
    logOutAction() // when Token expired
  }
  return send
}

export const requestMethod = async (endpoint , body , type = 'post', axiosInstance = platformApi) => {
  var res
  switch (type) {
    case "post":
      res = await axiosInstance.post(endpoint , body).catch((e)=>{
        return e.response
      })
      return res
    case "get":
      res = await axiosInstance.get(endpoint).catch((e)=>{
        return e.response
      })
      return res
    default:
      res = await axiosInstance.post(endpoint , body).catch((e)=>{
        return e.response
      })
      return res
  }
}


export const getSearchQuery = (feilds , searchTxt ) => {

  var shouldList = []

  for (let index = 0; index < feilds.length; index++) {
    const element = feilds[index];
    shouldList = [...shouldList,
    {
      "wildcard": { [element]: `*${searchTxt.toString().toLowerCase()}*` }
    },
    {
      "wildcard": { [element]: `*${searchTxt.toString().toUpperCase()}*` }
    },
    {
      "wildcard": { [element]: `*${capitalizeFirstLetter(searchTxt)}*` }
    },
    {
      "match_phrase": { [`${element}.keyword`]: `*${searchTxt}*` }
    },
    ]
  }

  return shouldList
}
