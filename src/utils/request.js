// import fetch from 'dva/fetch';
import axios from 'axios';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';


const success = (response) => {
  
  
  const { statusText, status } = response

  let success = false;
  if (response.status >= 200 && response.status < 300) {
      success = true;
  }

  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
  // console.log(success)


  return {
    success:success,
    message:statusText,
    statusCode:status,
    ...data
  }
}


const fail = (error) => {
  console.log(error)
  const { response } = error;
  let msg,statusCode;

  if(response && response instanceof Object){
    const { data, statusText } = response;
    statusCode = response.status;
    msg = data.message || statusText
  }else {
    statusCode = 600;
    msg = error.message || 'Network Error'
  }

  return {
    success:false,
    statusCode,
    message:msg
  }
}

const fetch = (options) => {

    let {
      method = 'get',
      url,
      data,
      fetchType
    } = options;

    let domin='',cloneData;

    cloneData = lodash.cloneDeep(data);

    try{
      if(url.match(/[A-Za-z]+:\/\/[^\/]*/)){
        domin = url.match(/[A-Za-z]+:\/\/[^\/]*/)[0];
        url = url.slice(domin.length)
      }
      
      url = pathToRegexp.compile(url)(data);
      url = domin + url;

    }catch(e){
      message.error(e.message);
    }

    if(fetchType == 'JSONP'){

    }
    // console.log(13)

    // console.log(cloneData)
    switch(method.toLowerCase()){
      case 'get':
        return axios.get(url,{
          params:cloneData
        })
      case 'post':
        return axios.post(url,cloneData);
      case 'put':
        return axios.put(url,cloneData);
      case 'delete':
        return axios.delete(url,{
          data:cloneData,
        })
      case 'patch':
        /*
          PATCH 操作主要用来更新部分资源，而且其不是幂等（所谓的幂等就是每次更新后，结果不变）的。
          Put操作主要用来更新全部的资源，而且其实幂等的。 
        */
        return axios.patch(url, cloneData);
      default:
        return axios(options);

    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  
    return fetch(options)
         .then((response) => { 
              const { statusText, status } = response

              let success = false;
              if (response.status >= 200 && response.status < 300) {
                  success = true;
              }

              let data = response.data
              // const error = new Error(response.statusText);
              // error.response = response;
              // throw error;
              // console.log(success)

              // console.log(response)
              // console.log(data);
              // console.log({
              //   success:success,
              //   message:statusText,
              //   statusCode:status,
              //   ...data
              // })
              // console.log(data)

              // console.log(14)
              return {
                success:success,
                message:statusText,
                statusCode:status,
                ...data
              }
          }).catch((error) => {
              // console.log(error)
              const { response } = error;
              let msg,statusCode;

              if(response && response instanceof Object){
                const { data, statusText } = response;
                statusCode = response.status;
                msg = data.message || statusText
              }else {
                statusCode = 600;
                msg = error.message || 'Network Error'
              }

              return {
                success:false,
                statusCode,
                message:msg
              }
          });
}
