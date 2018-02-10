// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Layout from 'components/Layout';
import Cookies from 'js-cookie';

import appStyle from "./app.less";


const {Sider,Header,Bread} = Layout;

const App = ({children,dispatch,app,loading,location}) => {
    
    const token = Cookies.get('u_Tok');
   
    let {siderFold,menus,user,currentPath} = app

    // console.log(app)
    // 还没登录就跳转到登录框
    // console.log(!token || location.pathname == '/login')

    if(!token || location.pathname == '/login'){   
        return (
            <div>
                {children}
            </div>
        )
    }

    const siderProp = {
        menu:menus, 
        siderFold ,
        handleClick({ item, key, keyPath }){
            // Cookies.set('currentPath',keyPath);
            dispatch({type:'app/updateState',payload:{currentPath:keyPath}})  
        }
    };
    const headerProps = {
        user,
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

    // console.log(currentPath)


    return (
        <div className={appStyle.wrapper}>
            
            <Sider {...siderProp}/>
           
            <div className={appStyle.main} style={siderFold?{marginLeft:"45px"}:{}}>
                <Header {...headerProps}/>
                <Bread {...breadProps}/>
                <div className={appStyle.content}>
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

export default connect(({app,loading}) => ({app,loading}))(App);