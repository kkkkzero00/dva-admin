import {query,getMenu,logout} from 'services/app'
import lodash from 'lodash';
import {routerRedux} from 'dva/router'
import Cookies from 'js-cookie';
import config from 'utils/config';

export default {
    namespace:'app',
    state:{
        permissions:{
            visit:[]
        },
        menus:[
            {
                id:1,
                icon:'laptop',
                name:'Dashboard',
                router:'/dashboard'
            }
        ],
        siderFold:localStorage.getItem('siderFold') === 'true',
        currentPath:["1"]
    },
    subscriptions:{
        // 用于监听路http://localhost:8000/indexPage由
        setup ({dispatch,history,state}) {
            // console.log(history)
            dispatch({type:'checkLogin'});
            
            // console.log(Cookies.get('userInfo'))
            if(Cookies.get('userInfo')){
                let {menus,user} = JSON.parse(Cookies.get('userInfo'));
                let permissions = {};
                permissions['visit'] = user.role.visit;
                // console.log(JSON.parse(Cookies.get('userInfo')))
                dispatch({
                    type:'updateState',
                    payload:{
                        user,
                        menus,
                        permissions,
                    }
                })
            }

            /*处理面包屑*/
            history.listen(({ pathname }) => {
                // console.log(pathname)
                let {commonPage} = config;

                if(!commonPage.includes(pathname))
                    dispatch({type:"setCurrPath",payload:{paths:pathname}});
            });

            
            /*let timer;
            window.onresize = () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    dispatch({type:'changeNavbar'})
                },300)
            }*/
        },

    },
    effects:{
        *query({payload},{put,call,select}){
            /*每个函数里面好像还有个location对象*/
           

            const {success,user} = yield call(query,payload);
            // console.log(user)
          
        
            if(success&&user){
                let {menus} = yield call(getMenu)
               
                const {role} = user;
                let permissions = lodash.cloneDeep(role);

                let list = menus;
                // console.log(user)
                // console.log(permissions)
               
                if(permissions.id === 1 || permissions.id === 0){
                    permissions.visit = list.map(item => item.id);
                }else{
                    menus = list.filter((item) => {
                        const cases = [
                            permissions.visit.includes(item.id),
                            item.pid?permissions.visit.includes(item.pid):true,
                        ];
                        // console.log(cases)
                        return cases.every(_=>_);
                    })
                } 
                // console.log(menus)

                /*注册到全局也就是app的state里面*/
                Cookies.set('userInfo',{menus,user},{expires: 1 })
                // console.log(JSON.parse(Cookies.get('userInfo')));

                yield put({
                    type:"updateState",
                    payload:{
                        user,
                        menus,
                        permissions,
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
            const {app} = yield select()
            let {user} = app;

            const token = Cookies.get('u_Tok');
            // console.log(!token || location.pathname == '/login')
            if(!token || location.pathname == '/login'){
                 yield put(routerRedux.push('/login'));
            }
        },

        *logout({payload},{put,call}){
            let res = yield call(logout);

            if(res.success){
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
            
            let currP = menus.filter(item => item.route === paths)[0];
            let keyPath = currP.path.split("-");

            yield put({
                type:'updateState',
                payload:{
                    currentPath:keyPath
                }
            })
        },
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
                siderFold
            }
        }
    }
}