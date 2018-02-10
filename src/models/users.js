import {users_query} from 'services/users';


export default {
    namespace: 'users',
    state: {
        list:[],
        total:null,

        loading:false,//控制加载状态
        current:null,//当前分页信息
        currentItem:{},//当前操作的用户对象
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

            });
        }
    },
    effects:{
        *query({payload},{select,call,put}){

        },
        *create(){},
        //由于是delete关键字所以要进行特别处理
        *'delete'(){},
        *update(){}
    },
    reducers:{
        showLoading(state,action){
            return {...state,loading:true};
        },//控制加载状态的reducer
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