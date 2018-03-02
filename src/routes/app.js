// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Layout from 'components/Layout';
import Cookies from 'js-cookie';
import classnames from 'classnames';
import "./app.less";


const {Sider,Header,Bread} = Layout;

const App = ({children,dispatch,app,loading,location}) => {
    
    const token = Cookies.get('u_Tok');
   
    let {siderFold,menus,user,currentPath,isNavbar,openKeys} = app

    // console.log(siderFold)
    // 还没登录就跳转到登录框
    // console.log(!token || location.pathname == '/login')
    // console.log(app);
    if(!token || location.pathname == '/login'){   
        return (
            <div className="wrapper">
                {children}
            </div>
        )
    }

    const siderProp = {
        menu:menus, 
        siderFold ,
        isNavbar,
        handleClick(item, key, keyPath){
            // Cookies.set('currentPath',keyPath);
            dispatch({type:'app/updateState',payload:{currentPath:keyPath}})  
        }
    };
    const headerProps = {
        user,
        menus,
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

    // console.log(isNavbar)


    return (
        <div className="wrapper">
            
            <Sider {...siderProp}/>
            {isNavbar && (!siderFold)?(<div className="drawer-bg" onClick={drawerBgProps.switchSider}></div>):''}
            
            <div className={classnames(
                    'main',
                    {'navBar':isNavbar}
                )} 
                style={((!isNavbar)&&siderFold)?{marginLeft:"45px"}:{}}>
                <Header {...headerProps}/>
                <Bread {...breadProps}/>
                <div className="content">
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