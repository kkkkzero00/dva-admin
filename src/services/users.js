/*处理异步请求*/
import request from 'utils/request';
import qs from 'qs';

import config from 'utils/config'

const {isUseMock} = config;
let api;

if(!isUseMock){
    api = config.api2;
}else{
    api = config.api;
}


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
    // console.log(searchParams);

    let finalUrl = api.users+'?'+searchParams;

    let params = {
        url:finalUrl,
        method:'get',
    }
   
    return request(params);
}


/*新增数据*/
export async function create(data){

    let params = {
        url:api.user,
        method:'post',
        data
    }
   
    return request(params);
}

/*更新数据*/
export async function update(data){

    let params = {
        url:api.user+"/:id",
        method:'put',
        data
    }
   
    return request(params);
}

export async function remove(data){
    // console.log(data)
    let params = {
        url:api.user,
        method:'delete',
        data
    }
   
    return request(params);
}


