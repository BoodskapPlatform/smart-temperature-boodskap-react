var Prefs = (function () {

  var getItem = function (key) {
    var value = localStorage.getItem(key);
    return value
  };

  var setitem = function (key, value) {
    localStorage.setItem(key, value);
  };

  var isLoggedIn = function () {
    var value = localStorage.getItem("ISLOGIN");
    return value
  };

  var getUserData = function () {
    var value = localStorage.getItem("USERDATA");
    if (value !== "") {
      return JSON.parse(value)
    } else {
      return {}
    }
  };

  var getToken = function () {
    var value = localStorage.getItem("TOKEN");
    if (value) {
      return value
    } else {
      return ""
    }
  };

  var getUserID = function () {
    var value = localStorage.getItem("USERID");
    if (value) {
      return value
    } else {
      return ""
    }
  };

  var getUserDomain = function () {
    var value = localStorage.getItem("DOMAINKEY");
    if (value) {
      return value
    } else {
      return ""
    }
  };

  var getUserApiKey = function () {
    var value = localStorage.getItem("APIKEY");
    if (value) {
      return value
    } else {
      return ""
    }
  };

  return {
    getItem: getItem,
    setitem: setitem,
    isLoggedIn: isLoggedIn,
    getUserData: getUserData,
    getToken: getToken,
    getUserID: getUserID,
    getUserDomain: getUserDomain,
    getUserApiKey: getUserApiKey,
  }

})();

export default Prefs;