import React,{Component} from 'react';

import {Menu,Icon} from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import BreadStyle from './Bread.less'
import lodash from 'lodash';


const Bread = ({currentPath,menus}) => {
    // console.log(currentPath);
    // console.log(menus )

    let currMenu = menus.filter(item => currentPath.includes(item.id))
    
    let currP = lodash.cloneDeep(currentPath);
    

    const handleClick = (event) => {
       // console.log(event.target)
    }
    const getBread = (currPath,currMenu) => {
        let Breads = [];
        while(currPath.length > 0){
            let breadId = currPath.shift();

            let breadItem = currMenu[currMenu.findIndex(item => item.id == breadId)];
            
            // console.log(breadItem)

            if(breadItem.route){
                Breads.unshift(<span key={breadItem.id}><Icon type={breadItem.icon} style={{marginRight:4}}/><Link to={breadItem.route}>{breadItem.name}</Link></span>)
            }else{
                Breads.unshift(<span key={breadItem.id}><Icon type={breadItem.icon} style={{marginRight:4}}/><span>{breadItem.name + " / "}</span></span>)
            }
        }
        // console.log(Breads)
        return Breads;
    }
  
    // console.log(currentPath);

    return (
        <div className="bread">
           {getBread(currP,currMenu)}
        </div>
    )
}



Bread.propTypes = {
    currentPath:PropTypes.array,
    menus:PropTypes.array
}

export default Bread;