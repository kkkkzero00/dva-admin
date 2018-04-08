/*处理异步请求*/
import request from 'utils/request';

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
        // console.log(this)
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

        // console.log(otherParams);

        if(otherParams){
            Object.keys(otherParams).forEach((item) => {
                // console.log(otherParams[item]);

                searchParams.push((item+'='+otherParams[item]))
            })
        }

        searchParams = searchParams.join('&');

        /*特殊字符要进行ascii转义，防止浏览器解析url时将其转换 如 '+'会转成 ' '*/
        searchParams = searchParams.replace(/[\+|\?|\/|\#]/g,function(m){
            return "%"+m.charCodeAt().toString(16);
        });

        let finalUrl = api[this.apiName]+'/lists'+'?'+searchParams;
   

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
            url:api[this.apiName]+"/"+data.id,
            method:'put',
            data
        }
        // console.log(data);
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


