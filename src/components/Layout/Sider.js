import {Component,PureComponent} from 'react';

import PropTypes from 'prop-types';
import config from 'utils/config';
import {Menu ,Icon ,Spin} from 'antd';
import lodash from 'lodash';
import { Link } from 'dva/router';
import {arrayToTree} from 'utils/commonFunc';


import SiderStyle from './Sider.less'
import classnames from 'classnames'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class Sider  extends PureComponent{
    constructor(props){

        super(props);

        let {menu,siderFold,isNavbar} = props;

        menu = menu.filter((item) => {
            return item.type != 'url';
        })

        let menuTree = arrayToTree(menu);

        this.state = {
            openKeys:['5'],
            menuTree,
            isNavbar,
            siderFold
        };

       this.handleClick = this.handleClick.bind(this);
       this.onOpenChange = this.onOpenChange.bind(this);
    }

    /*首先把数组menu变成树状结构*/

    
    
    /*通过这个树状结构再生成树状环境*/
    getMenu = (menuTree,siderFold,type="0") => {
        let { loadingEffects } = this.props;

        return menuTree.map((item,index)=>{

            if(item.children){
                return (
                    <SubMenu 
                        key={item.id}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                {!siderFold && item.name}
                            </span>
                        }>
                        {this.getMenu(item.children,siderFold,2)}
                    </SubMenu>
                )
            }else{

                let isShowSpining = (!!(item.model) && loadingEffects[`${item.model}/query`]);
                // console.log(loadingEffects[`${item.model}/query`]);

                return (
                    <Menu.Item key={item.id}>
                        <Link to={item.route}>
                            {item.icon && <Icon type={item.icon} />}
                            {(!siderFold || type == 2) && item.name}
                            {isShowSpining?<Spin style={{float:"right",paddingTop:9}}/>:''}
                        </Link>
                    </Menu.Item>
                )
            }
            
        })     
    }

    onOpenChange(openKeys) {

        let {isNavbar,siderFold} = this.state;

        if(!isNavbar){
            // console.log(openKeys)
            let lastOpenKeys = openKeys.find(item => this.state.openKeys.indexOf(item) == -1);
       

            if(lastOpenKeys){
                this.setState({
                    openKeys:[lastOpenKeys]
                });
            }else{
                this.setState({
                    openKeys:[]
                })
            }           
        }


    }

    handleClick({ item, key, keyPath }){
        this.props.handleClick(item, key, keyPath)
    }

    componentWillReceiveProps(nextProps){
        let {siderFold,isNavbar} = nextProps;

        if(siderFold != this.state.siderFold){
            this.setState({siderFold})
        }

        if(isNavbar != this.state.isNavbar){
            this.setState({isNavbar})
        }

    }

    render(){
        
        let {siderFold,isNavbar,menuTree,openKeys} = this.state
        // console.log(this.state)
        let cs = classnames({
            'sider':!isNavbar,
            'fold':(!isNavbar && siderFold),

            'navSider':isNavbar,
            'navFold':(isNavbar && siderFold),
        })

        
        let mode = (siderFold || isNavbar) ? 'vertical' :'inline';
        let menuProps = {}
        

        //注意这里要指定不同的key 否则就相当于渲染同一个sider
        if(mode == 'inline'){
            // console.log(openKeys);
            menuProps = {
                key:"sider1",
                mode,
                openKeys,
                onOpenChange:this.onOpenChange,
                onClick:this.handleClick
            }
        }else{
            menuProps = {
                key:"sider2",
                mode,
                onClick:this.handleClick
            }
        }

        return (
            <div className={cs}>
                <div className="logo">
                    <img alt={'logo'} src={config.logo} />
                    <span>HJK</span>
                </div>
                <Menu {...menuProps}>
                    {this.getMenu(menuTree,siderFold)}
                </Menu>
                
            </div>
        )
    }
    
}

Sider.propTypes = {
    menu:PropTypes.array

}

export default Sider;