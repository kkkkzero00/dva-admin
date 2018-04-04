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


export default class CommonServices {
    constructor(name){
        // console.log(name)
        this.apiName = name;
        this.query = this.query.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async query(data){
        // console.log(this)
        let {currPage,pageSize,...otherParams} = data;

        let searchParams = [`currPage=${currPage}`,`pageSize=${pageSize}`];


        if(otherParams){
            Object.keys(otherParams).forEach((item) => {
                searchParams.push((item+'='+otherParams[item]))
            })
        }

        searchParams = searchParams.join('&');
        // console.log(searchParams);

        let finalUrl = api[this.apiName]+'/lists'+'?'+searchParams;
        // console.log(finalUrl);

        let params = {
            url:finalUrl,
            method:'get',
        }
       
        return request(params);
    }

    /*读取单条数据*/
    async  read(id){
        let url = api[this.apiName] +'/'+id+'/read';

        let params = {
            url,
            method:'get',
        }

        return request(params);

    }


    /*新增数据*/
     async  create(data){

        let params = {
            url:api[this.apiName],
            method:'post',
            data
        }
       
        return request(params);
    }

    /*更新数据*/
    async  update(data){

        let params = {
            url:api[this.apiName]+"/:id",
            method:'put',
            data
        }
       
        return request(params);
    }

    async  remove(data){
        // console.log(data)
        let params = {
            url:api[this.apiName],
            method:'delete',
            data
        }
       
        return request(params);
    }
}


