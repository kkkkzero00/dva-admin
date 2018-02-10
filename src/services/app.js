import request from 'utils/request';
import config from 'utils/config'
const {api} = config;

export async function query(data) {
  // console.log(dsata)
  let params = {
    url:api.userPermission,
    method:'get',
    data
  }

  return request(params);
}

export async function logout(data) {
  // console.log(dsata)
  let params = {
    url:api.logout,
    method:'get',
    data
  }

  return request(params);
}


export async function getMenu(){
    return request({
        url:api.getMenus,
        method:'get',
    })
}