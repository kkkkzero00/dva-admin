import request from 'utils/request';
import config from 'utils/config'
const {isUseMock} = config;
let api;

if(!isUseMock){
    api = config.api2;
}else{
    api = config.api;
}

export async function query(data) {
  // console.log(data)
  let params = {
    url:api.checkUserExist,
    method:'post',
    data
  }
  // console.log(12)
  return request(params);
}
