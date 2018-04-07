import {query,getPrimaryKey} from 'services/login'
import {queryURL} from 'utils/commonFunc'
import Cookies from 'js-cookie';
import qs from 'qs';

export default {
    namespace:'login',
    state:{
       loginLoading:false,
       loginMessage:'',
       hasTriggerLogin:0,
       token:''
    },
    subscriptions:{
        setup({ dispatch, history }) {  // eslint-disable-line
            dispatch({type:"getPublicKey"});
        },
    },
    effects:{
        *getPublicKey({payload},{put,call}){
            let {token,success} = yield call(getPrimaryKey);
            if(success){
               yield put({type:'updateState',payload:{token}});
            }
        },
        *login({payload},{put,call}){
            // console.log(payload) 
            // console.log(query)
            
            yield put({type:'showLoading'});
            // console.log(11)
            
            const res = yield call(query,payload);
         
            yield put({type:'hideLoading'});

            // console.log(res)

            if(res&&res.success){
                const from = queryURL('from');
                /*登记信息*/
                yield put({type:'app/query'})
            }else{
                yield put({type:'updateState',payload:{loginMessage:res.message?res.message:'网络错误请重新登录！', hasTriggerLogin:2}})
            }
        },
        *test({payload},{put,call}){
            console.log(payload)
        }
    },

    reducers:{
        updateState(state,{payload}){
            // console.log(payload)
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