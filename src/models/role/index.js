import commonListModel from 'utils/commonListModel';
import {getAccess,setAccess} from 'services/role/index';

/*有扩展功能的需求可以在这里配置*/
var roleModel = {
    namespace:'role',
    state:{
        accessList:[]
    },
    effects:{
        *getAccess({payload},{call,put,select}){
           let res =  yield call(getAccess);
           if(res.success)
             yield put({type:'updateStatus',payload:{accessList:res.data}})
        },
        *setAccess({payload},{call,put,select}){

           let submitStatus = {type:3,message:'正在提交，请耐心等待。'};
           yield put({type:"updateStatus",payload:{submitStatus}});

           let res = yield call(setAccess,payload.data);

           if(res.success){

                let selfState = (yield select())['role'];
                let {pageSize} = selfState;
                
                yield put({type:"query",payload:{currPage:1,pageSize:pageSize}});

                submitStatus = {type:1,ok:true,message:'提交成功！'};

           }else{
                submitStatus = {type:2,ok:false,message:res.message?res.message:'提交失败，请检查网络是否畅通！'};
           }

           yield put({type:"updateStatus",payload:{submitStatus}});
        }
    }
}
// console.log(commonListModel(roleModel));

export default commonListModel(roleModel)

// export default usersModel