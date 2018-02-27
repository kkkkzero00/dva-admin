import request from 'utils/request';
import config from 'utils/config'
const {api} = config;

export async function query(data) {
  // console.log(dsata)
  let params = {
    url:api.login,
    method:'post',
    data
  }
  // console.log(12)
  return request(params);
}
