import {query,getMenu,logout,checkAuthRoute} from 'services/app'
import lodash from 'lodash';
import {routerRedux} from 'dva/router'
import Cookies from 'js-cookie';

import config from 'utils/config'
const {isUseMock} = config;

export default {
    namespace:'app',
    state:{
        userInfo:{},
        menus:[],
        //打开是false，关闭是true
        siderFold:localStorage.getItem('siderFold') === 'true',
        currentPath:[isUseMock?1:"2000"],
        isNavbar: document.body.clientWidth < 800,
        isMiddleScrean:document.body.clientWidth < 800 && document.body.clientWidth > 456,
        isSmallScrean:document.body.clientWidth <= 456,
    },
    subscriptions:{
        // 用于监听路http://localhost:8000/indexPage由
        setup ({dispatch,history,state}) {
            // console.log(history)
            dispatch({type:'checkLogin'});
            
            
            // console.log(JSON.parse(Cookies.get('userInfo')))
            
            if(Cookies.get('userInfo')){
                let {menus,userInfo} = JSON.parse(Cookies.get('userInfo'));
                
                
                dispatch({
                    type:'updateState',
                    payload:{
                        userInfo,
                        menus,
                    }
                })
            }else{
                dispatch(routerRedux.push('/login'));
            }


            if(Cookies.get('currentPath')){
                let currentPath = JSON.parse(Cookies.get('currentPath'));
                dispatch({
                    type:'updateState',
                    payload:{
                        currentPath
                    }
                })
            }
            



            /*处理面包屑*/
            history.listen(({ pathname }) => {

                // console.log(pathname)
                let {commonPage} = config;

                if(!commonPage.includes(pathname)){
                    //验证该用户是否有权限访问某个地址
                    dispatch({type:"checkAuth",payload:{path:pathname}});
                    //设置当前路径，用作面包屑
                
                    if(pathname == '/'){
                        pathname = '/indexPage';
                    }

                    // console.log(pathname);
                    dispatch({type:"setCurrPath",payload:{paths:pathname}});
                }
                
            });

            
            let timer;
            window.onresize = () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    dispatch({type:'changeNavbar'})
                },300)
            }
        },

    },
    effects:{
        *query({payload},{put,call,select}){
            /*每个函数里面好像还有个location对象*/
           
            // let token = Cookies.get('u_Tok');
            let res = yield call(query,payload);
            let {success,data} = res;         
            
            if(success){
                let menus;
                let permissions;
                let userInfo = data.userInfo;
                // console.log(userInfo)
                if(isUseMock){
                    
                    let {role} = userInfo;

                    let menusRes = yield call(getMenu,{id:role.id});
                    
                    menus = menusRes.menus;
                }else{
                    menus = data.menus;
                }       
    

                // console.log(menus);
                
                Cookies.set('userInfo',{menus,userInfo},{expires: 1 })
                // console.log(JSON.parse(Cookies.get('userInfo')));
                
                /*注册到全局也就是app的state里面*/
                yield put({
                    type:"updateState",
                    payload:{
                        userInfo,
                        menus,
                    }
                })

                yield put({
                    type:'login/updateState',
                    payload:{
                        loginMessage:'登录成功！',
                        hasTriggerLogin:1
                    }
                })


                if(location.pathname == '/login'){
                    yield put(routerRedux.push('/indexPage'));
                }

            }else{
               
                yield put({
                    type:'login/updateState',
                    payload:{
                        loginMessage:'网络错误请重新登录！',
                        hasTriggerLogin:2
                    }
                })
            }
        },

        *checkLogin({payload},{put,select}){
            const token = Cookies.get('u_Tok');
            // console.log(!token || location.pathname == '/login')
            if(!token || location.pathname == '/login'){
                 yield put(routerRedux.push('/login'));
            }
        },

        *logout({payload},{put,call}){
          
            let res = yield call(logout);

            // console.log(res)
            if(res.success){
                Cookies.remove('userInfo');

                yield put({type:"checkLogin"});
                yield put({
                    type:'login/updateState',
                    payload:{
                        hasTriggerLogin:0
                    }
                })
            }else{
                throw(res);
            }
        },

        *setCurrPath({payload},{put,select}){

            let {app} = yield select();
            let {menus} = app;
            let paths = payload.paths;
            
            //对详情页进行处理
            if(paths.slice(-6) == 'detail'){
                let pattern = /(\d)+/g;

                paths = paths.replace(pattern,function(m){
                    return ':id';
                })               
            }

            let currP = menus.filter(item => item.route === paths)[0];

            // console.log(menus);
            // console.log(paths)

            let keyPath = currP.path.split("-");

            yield put({
                type:'updateState',
                payload:{
                    currentPath:keyPath
                }
            })
        },

        *changeNavbar ({payload}, { put, select }) {
          const { app } = yield(select(_ => _))
          const isNavbar = document.body.clientWidth < 769
          if (isNavbar !== app.isNavbar) {
            yield put({ type: 'updateState', payload:{ isNavbar, isSmallScrean:isNavbar}})
          }
        },

        *checkAuth ({payload}, { put, call }){
            let res = yield call(checkAuthRoute,{...payload});
            // console.log(res);
            if(!res.success){
                yield put(routerRedux.push('/error'));
            }
        }
    },

    reducers:{
        updateState(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },

        switchSider(state){
            // console.log(state)
            localStorage.setItem('siderFold',!state.siderFold);
            let siderFold = !state.siderFold
            return {
                ...state,
                siderFold,
            }
        },
        
        // handlePageStatus (state, { payload }) {
        //   return {
        //     ...state,
        //     isNavbar: payload,
        //   }
        // },
    }
}