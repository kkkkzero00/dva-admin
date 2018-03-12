import {query} from 'services/login'
import {queryURL} from 'utils/commonFunc'
import Cookies from 'js-cookie';
import qs from 'qs';

export default {
    namespace:'login',
    state:{
       loginLoading:false,
       loginMessage:'',
       hasTriggerLogin:0
    },
    effects:{
        *login({payload},{put,call}){
            // console.log(payload) 
            // console.log(query)
            
            yield put({type:'showLoading'});
            // console.log(11)
            
            const info = yield call(query,payload);
         
            yield put({type:'hideLoading'});

            if(info&&info.success){
                const from = queryURL('from');
                /*登记信息*/
                yield put({type:'app/query'})
            }
        },
    },

    reducers:{
        updateState(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },
        showLoading(state){
            return {
                ...state,
                loginLoading:true
            }
        },
        hideLoading(state){

            return{
                ...state,
                loginLoading:false
            }
        }
    }
}