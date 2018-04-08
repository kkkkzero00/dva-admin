// ./src/router.js
// import React from 'react';
// import { Router, Route } from 'dva/router';

import React from 'react';
import { Router,Route } from 'dva/router';

import App from './routes/app';
import PropTypes from 'prop-types';
import axios from 'axios';


const registerModel = (app,model) => {
    // console.log(app._models);

    if(!(app._models.filter(m => m.namespace === model.namespace).length === 1)){
        app.model(model);
    }
}

function RouterConfig({ history,app }) {

    var routes = [{
            path: '/',
            component:App,
            getIndexRoute(nextState,cb){

                require.ensure([],require => {

                    registerModel(app,require('./models/indexPage'));
                    //index的路由组件必须这样写
                    cb(null,{component:require('./routes/indexPage/')})
                },'indexPage')
            },
            childRoutes:[
                {
                    path:'indexPage',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/indexPage'));
                            cb(null,require('./routes/indexPage/'));
                        },'indexPage')
                    },
                    /*传入第三个参数时会被阻塞，cb被调用才继续执行*/
                    onEnter(nextState, replace){
                         // console.log(nextState)
                         
                    }
                },
                {
                    path:'login',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/login'));
                            cb(null,require('./routes/login/'));
                        },'login')
                    }
                },
                {
                    path:'/users',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/users/'));
                            cb(null,require('./routes/users/'));
                        },'users')
                    }
                },
                {
                    path:'/manager',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/manager/'));
                            cb(null,require('./routes/manager/'));
                        },'users')
                    }
                },
                {
                    path:'users/:id/detail',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/users/detail'));
                            cb(null,require('./routes/users/detail/'));
                        },'users_detail')
                    }
                },
                {
                    path:'manager/:id/detail',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/manager/detail'));
                            cb(null,require('./routes/manager/detail/'));
                        },'manager_detail')
                    }
                },
                {
                    path:'/role',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/role/'));
                            cb(null,require('./routes/role/'));
                        },'users')
                    }
                },
                {
                    path:'charts/lineChart',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/charts/lineChart'));
                            cb(null,require('./routes/charts/lineChart'));
                        },'charts-lineChart')
                    }
                }
                
                
            ]
    }]


    let all = {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
    }
    let error = {
          path: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
    }

    routes[0].childRoutes.push(error,all);
    // console.log(routes[0].childRoutes);

    return <Router history={history} routes={routes} />
}

RouterConfig.propTypes = {
    history:PropTypes.object,
    app:PropTypes.object,
}

export default RouterConfig;


