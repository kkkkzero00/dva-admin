import {query} from 'services/users';


export default {
    namespace: 'users',
    state: {
        list:[],
        current:1,//当前分页信息
        pageSize:10,
        total:null,

        loading:false,//控制加载状态
        formVal:{},
        
        modalVisible:false,//弹出窗显示状态
        modalType:'create',//弹出窗的类型（添加用户，编辑用户）
    },
    subscriptions:{
        setup({dispatch,history}){
            /*
                监听路由信息，只要路径是 /users/ 
                那么我们就会发起 action，获取用户数据
             */
            history.listen(location => {
                if (location.pathname === '/user') {
                  dispatch({
                    type: 'query',
                    payload: location.query,
                  })
                }
            })
        }
    },
    effects:{
        *query({payload},{select,call,put}){
            yield put({type:'showLoading'})

            let res =  yield call(query,payload);
            // console.log(res)
            yield put({type:'hideLoading'});

            let {data,total} = res;
            let {currPage} = payload;
            yield put({type:'updateStatus',payload:{list:data,total,current:currPage}});


        },
        *create(){},
        //由于是delete关键字所以要进行特别处理
        *'delete'(){},
        *update(){}
    },
    reducers:{
        updateStatus(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },
        showLoading(state,action){
            return {...state,loading:true};
        },//控制加载状态的reducer
        hideLoading(state,action){
            return {...state,loading:false};
        },
        showModal(){},//控制modal显示状态的reducer
        hideModel(){},
        querySuccess(state,action){
          
            return {...state,...action.payload,loading:false}
        },
        createSuccess(){},
        deleteSuccess(){},
        updateSuccess(){},
    }
}