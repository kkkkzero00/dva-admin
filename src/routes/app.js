// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Layout from 'components/Layout';
import Cookies from 'js-cookie';
import classnames from 'classnames';
import "./app.less";

import Loader from 'components/Loader';

const {Sider,Header,Bread} = Layout;

const App = ({children,dispatch,app,loading,location}) => {
    
    const token = Cookies.get('u_Tok');
   
    let {siderFold,menus,userInfo,currentPath,isNavbar,openKeys,isSmallScrean} = app

    // console.log(siderFold)
    // 还没登录就跳转到登录框
    // console.log(!token || location.pathname == '/login')
    // console.log(app);<Loader spinning/>
    


    if(!token || location.pathname == '/login'){   
        return (
            <div className={classnames({wrapper:true})}>
                <Loader spinning={loading.effects['app/query']}/>
                {children}
            </div>
        )
    }

    const siderProp = {
        menu:menus, 
        siderFold ,
        isNavbar,
        loadingEffects:loading.effects,
        handleClick(item, key, keyPath){    
            Cookies.set('currentPath',keyPath);
            dispatch({type:'app/updateState',payload:{currentPath:keyPath}})  
        }
    };
    // console.log(app);

    const headerProps = {
        userInfo,
        isNavbar,
        switchSider(){
            dispatch({type:'app/switchSider'})
        },
        logout(){
            dispatch({'type':'app/logout'})
        }

    };

    
    let breadProps = {
        currentPath,
        menus
    }

    let drawerBgProps = {
        switchSider(){
            dispatch({type:'app/switchSider'})
        },
    }

    // console.log(loading)


    return (
        <div className="wrapper">
            <Loader spinning={loading.effects['app/logout']}/>
            <Sider {...siderProp}/>
            {isNavbar && (!siderFold)?(<div className="drawer-bg" onClick={drawerBgProps.switchSider}></div>):''}
            
            <div className={classnames(
                    'main',
                    {'navBar':isNavbar}
                )} 
                style={((!isNavbar)&&siderFold)?{marginLeft:"45px"}:{}}>
                <Header {...headerProps}/>
                <Bread {...breadProps}/>
                <div className="content" style={isSmallScrean?{margin:"24px auto"}:{}}>
                    {children}
                </div>
            </div>
        </div>
    )
}


App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object,
}

const mapStateProps = (state)=>{
    let {app,loading} = state;
    // console.log(state)
    return {app,loading};
}


export default connect(mapStateProps)(App);