
function assign(target,...source){
    
    source.forEach(item =>{
        let type = Object.prototype.toString.call(target);
        if(target == null){
            target = item;
            return;
        }

        if(type != '[object Object]'){ 
            target = item;
            return;
        }else{
            Object.keys(item).forEach(k => {
                if(target[k] == undefined){
                    target[k] = item[k];
                }else{
                    let subType = Object.prototype.toString.call(target[k])
                    if(subType == '[object Object]'){
                        target[k] = assign(target[k],item[k])
                    }else{
                        target[k] = item[k];
                    }
                }
            })
        }
        
    });

    return target;
}

function commonListModel(model){
    var {namespace} = model;
    var {query,create,update,remove} = require('services/'+namespace+'/index');


    var defaultModel = {
        state: {
            list:[],
            userConfig:[],
            token:null,
            current:1,//当前分页信息
            pageSize:10,
            total:null,

            loading:false,//控制加载状态
            submitStatus:{
                type:0,
                ok:false,
                message:''
            },    
        },
        subscriptions:{
            setup({dispatch,history}){
                /*
                    监听路由信息，只要路径是 /users/ 
                    那么我们就会发起 action，获取用户数据
                 */
                history.listen(location => {
                   
                })
            }
        },
        effects:{
            *query({payload},{call,put,select}){
                yield put({type:'showLoading'})

                let res =  yield call(query,payload);

                yield put({type:'hideLoading'});

                let {data,total,config,token} = res;

                let {currPage} = payload;

                if(config != undefined){
                    yield put({type:'updateStatus',payload:{userConfig:config}});
                }

                if(token != undefined){
                    yield put({type:'updateStatus',payload:{token}});
                }

                yield put({type:'updateStatus',payload:{list:data?data:[],total,current:currPage}});


            },
            *create({payload},{call,put,select}){
                // console.log(payload)

                let submitStatus = {type:3,message:'正在提交，请耐心等待。'};
                yield put({type:"updateStatus",payload:{submitStatus}});

                let res =  yield call(create,payload);

                if(res.success){
                    let selfState = (yield select())[namespace];
                    let {pageSize} = selfState;

                    submitStatus = {type:1,ok:true,message:'提交成功！'};
                    yield put({type:"query",payload:{currPage:1,pageSize:pageSize}});

                }else{
                    // console.log(res);
                    let {message} = res;
                    submitStatus = {type:2,ok:false,message:message?message:'提交失败，请检查网络是否畅通！'};
                }

                yield put({type:"updateStatus",payload:{submitStatus}});
                
            },
            *update({payload},{call,put,select}){
                let submitStatus = {type:3,message:'正在提交，请耐心等待。'};
                yield put({type:"updateStatus",payload:{submitStatus}});

                let res = yield call(update,payload);

                let {message} = res;

                // console.log(res);
                if(res.success){
                    let selfState = (yield select())[namespace];
                    let {pageSize,current} = selfState;

                    submitStatus = {type:1,ok:true,message};

                    yield put({type:"query",payload:{currPage:current,pageSize}});
                }else{
                    submitStatus = {type:2,ok:false,message};
                }

                yield put({type:"updateStatus",payload:{submitStatus}});
            },
            //由于是delete关键字所以要进行特别处理
            *'delete'({payload},{call,put,select}){
                let submitStatus = {type:3,message:'正在删除，请耐心等待。'};
                yield put({type:"updateStatus",payload:{submitStatus}});

                let res = yield call(remove,payload);
                // console.log(payload);
                
                let {message} = res;
                // console.log(res);

                if(res.success){
                    
                    let selfState = (yield select())[namespace];
                    let {pageSize,current} = selfState;

                    submitStatus = {type:1,ok:true,message};

                    yield put({type:"query",payload:{currPage:current,pageSize}});
                }else{
                    submitStatus = {type:2,ok:false,message};
                }

                yield put({type:"updateStatus",payload:{submitStatus}});
            },
            
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
            querySuccess(state,action){
              
                return {...state,...action.payload,loading:false}
            },

        }
    }

    defaultModel =  assign(defaultModel, model); 

    return defaultModel;  
}

export default commonListModel;
