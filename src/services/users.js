/*处理异步请求*/
import request from 'utils/request';
import qs from 'qs';

import config from 'utils/config'

const {api} = config;

/*请求数据*/
export async function query(data){
    let {currPage,pageSize,...otherParams} = data;

    let searchParams = [`currPage=${currPage}`,`pageSize=${pageSize}`];


    if(otherParams){
        Object.keys(otherParams).forEach((item) => {
            searchParams.push((item+'='+otherParams[item]))
        })
    }

    searchParams = searchParams.join('&');
    console.log(searchParams);

    let finalUrl = api.users+'?'+searchParams;

    let params = {
        url:finalUrl,
        method:'get',
    }
   
    return request(params);
}

