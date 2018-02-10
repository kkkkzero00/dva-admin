import request from 'utils/request';
import config from 'utils/config'
const {api} = config;

export async function query(data) {
  let c_url = 'http://127.0.0.1:3000/topics';
  let params = {
    url:c_url,
    method:'get',
    data
  }

  return request(params);
}

