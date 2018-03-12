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
  // console.log(dsata)
  let params = {
    url:api.userPermission,
    method:'get',
    data
  }

  return request(params);
}

export async function logout() {
  // console.log(dsata)
  let params = {
    url:api.logout,
    method:'get',
  }

  return request(params);
}


export async function getMenu(data){
  // console.log(data)
    return request({
        url:api.getMenus,
        method:'get',
        data
    })
}

export async function checkAuthRoute(data){
    // console.log(data)
    return request({
        url:api.checkAuthRoute,
        method:'get',
        data
    })
}