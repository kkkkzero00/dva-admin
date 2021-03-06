// import fetch from 'dva/fetch';
import axios from 'axios';
import lodash from 'lodash';
import pathToRegexp from 'path-to-regexp';
import {message} from 'antd';
import qs from 'qs';
import config from 'utils/config';



axios.defaults.withCredentials = true;


const fetch = (options) => {

    let {
      method = 'get',
      url,
      data,
      fetchType
    } = options;

    let domin='',cloneData;
    /*对后台的框架进行请求伪装*/
    let _method = method.toLowerCase();

    cloneData = lodash.cloneDeep(data);
    if(_method!='get')
      cloneData = {...cloneData,_method:_method.toUpperCase()};

    // console.log(cloneData);

    if(config.isUseMock){
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
    }


    if(fetchType == 'JSONP'){

    }
    // console.log(13)

    // console.log(JSON.stringify(cloneData))
    // console.log(method);
    switch(_method){
      case 'get':
        // console.log(url);
        return axios.get(url,{
          params:cloneData
        });
        break;
      case 'post':
        // console.log(123)
        return axios.post(url,qs.stringify(cloneData));
        break;
      case 'put':
        // console.log(qs.stringify(cloneData));
        return axios.put(url,qs.stringify(cloneData));
        break;
      case 'delete':
        return axios.delete(url,{params:cloneData});
        break;
      case 'patch':
        /*
          PATCH 操作主要用来更新部分资源，而且其不是幂等（所谓的幂等就是每次更新后，结果不变）的。
          Put操作主要用来更新全部的资源，而且其实幂等的。 
        */
        return axios.patch(url, cloneData);
        break;
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
              
              const { statusText ,data } = response

              let success = false;

              if (response.status >= 200 && response.status < 300 && data.code >=200 && data.status <300) {
                  success = true;
              }

              return {
                success,
                message:statusText,
                code:response.status,
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
