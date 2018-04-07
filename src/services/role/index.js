/*处理异步请求*/
import commonServices from 'utils/commonServices';
import request from 'utils/request';


import config from 'utils/config'

const {isUseMock} = config;
let api;

if(!isUseMock){
    api = config.api2;
}else{
    api = config.api;
}


class Role extends commonServices{
    constructor(name){
        super(name);

        this.getAccess = this.getAccess.bind(this);
        this.setAccess = this.setAccess.bind(this);

    }

    async getAccess(data){
        // console.log(this);
        let url = api[this.apiName] +'/getAccess';

        let params = {
            url,
            method:'get',
        }

        return request(params);
    }

    async setAccess(data){
        // console.log(data);
        let url = api[this.apiName] +'/setAccess/'+data.role_id;

        let params = {
            url,
            method:'post',
            data
        }

        return request(params);
    }
}

/*请求数据*/

export default new Role('role');



