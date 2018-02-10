import PropTypes from 'prop-types';
import config from 'utils/config';
import {Menu,Icon} from 'antd';
import lodash from 'lodash';
import { Link } from 'dva/router';

import SiderStyle from './Sider.less'
import classnames from 'classnames'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;




const Sider = ({menu,siderFold,handleClick}) => {
    // console.log(menu)

    /*首先把数组menu变成树状结构*/

    /**
     * [description]
     * @param  {[type]} array    [description]
     * @param  {String} id       [description]
     * @param  {String} pid      [description]
     * @param  {String} children [description]
     * @return {[type]}          [description]
     */
    const arrayToTree = (array,id='id',pid='pid',children='children') => {
        if (!(array instanceof Array))  return null
    
        let data  = lodash.cloneDeep(array);

        let hash = {};
        let result = [];

        data.forEach((item,index) => {
            hash[data[index][id]] = item;
        })

        data.forEach((item) => {
            let parent = hash[item[pid]];

            if(parent){
                !parent[children] && (parent[children] = []);
                parent[children].push(item)
            }else{
                result.push(item)
            }
        })
 
        return result;
    }
    // console.log(menu)
    menu = menu.filter((item) => {
        return item.type != 'url';
    })

    // console.log(menu);

    let menuTree = arrayToTree(menu);

    
    /*通过这个树状结构再生成树状环境*/
    const getMenu = (menuTree,type="0") => {
        // console.log(siderFold)
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
                        {getMenu(item.children,2)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.id}>
                        <Link to={item.route}>
                            {item.icon && <Icon type={item.icon} />}
                            {(!siderFold || type == 2) && item.name}
                        </Link>
                    </Menu.Item>
                )
            }
            
        })     
    }

    // console.log(menuTree)

    const onOpenChange = () => {

    }

    let cs = classnames(
        'sider',
        {fold:siderFold}
    )
    // console.log(config)
    return (
        <div className={cs}>
            <div className="logo">
                <img alt={'logo'} src={config.logo} />
                <span>HJK</span>
            </div>
            <Menu
                mode={siderFold ? 'vertical' :'inline'}
                onOpenChange={onOpenChange}
                onClick = {handleClick}>
                {getMenu(menuTree)}
            </Menu>
        </div>
    )
}

Sider.propTypes = {
    menu:PropTypes.array

}

export default Sider;