import axios from "axios";


/**
 * A method to call API with given settings
 *
 * @param {string} url
 * @param {object} data
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method
 * @param {object} params
 * @param {object} options
 * @return {*}
 */
export async function callApi(endpoint, method = "GET", body = null, headers = null) {
  if (!headers) {
    headers = {
      "content-type": "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": "*",
    };
  }

  let version = (function(){
    var ua= navigator.userAgent;
    var tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  let devicetype = (function(){
    var ua= navigator.userAgent;
    var tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[1]? [M[1]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  let device = {
    'x-device': version,
    'x-devicetype': devicetype,
    'x-lang': 'vi',
    'x-via': 'Z'
  }
  headers = {...headers,...device}

  return axios({
    method,
    url: endpoint,
    /*data: qs.stringify(body),*/
    headers,
    timeout:   1000 * 20,
  }).then((res) => {
    return res;
  }).catch((error) => {


    if (error.response) {

      if (error.response.status === 503){
        if (error.response.data.status === 0 && error.response.data.code === 'SYS.001'){

          return '';
        }else {

          return error.response;
        }
      }else {

        return error.response;
      }
    }
  });
}


