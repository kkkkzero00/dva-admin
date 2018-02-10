/*处理异步请求*/
import request from 'utils/request';
import qs from 'qs';

/*请求数据*/
async function users_query(params){
    let page = {
        current:1
    }
    params = page;
    let data = request(`/api/users?${qs.stringify(params)}`)
    
    return request(`/api/users?${qs.stringify(params)}`);
}

export default {users_query}