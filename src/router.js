// ./src/router.js
// import React from 'react';
// import { Router, Route } from 'dva/router';

import React from 'react';
import { Router,Route } from 'dva/router';

import App from './routes/app';
import PropTypes from 'prop-types';

const registerModel = (app,model) => {
    if(!(app._models.filter(m => m.namespace === model.namespace).length === 1)){
        app.model(model);
    }
}

function RouterConfig({ history,app }) {

    const routes = [{
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
                    path:'users',
                    getComponent(nextState,cb){
                        require.ensure([],require => {
                            registerModel(app,require('./models/users'));
                            cb(null,require('./routes/users/'));
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

                },
                {
                  path: '*',
                  getComponent (nextState, cb) {
                    require.ensure([], require => {
                      cb(null, require('./routes/error/'))
                    }, 'error')
                  },
                },

            ]
    }]

    return <Router history={history} routes={routes} />
}

RouterConfig.propTypes = {
    history:PropTypes.object,
    app:PropTypes.object,
}

export default RouterConfig;


