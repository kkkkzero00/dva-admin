import React,{Component} from 'react';

import {Menu,Icon} from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import BreadStyle from './Bread.less'
import lodash from 'lodash';


const Bread = ({currentPath,menus}) => {
    // console.log(currentPath)

    currentPath = currentPath.map(item => parseInt(item));
    // console.log(menus)
    let currMenu = menus.filter(item => {
        return currentPath.includes(parseInt(item.id));
    })
    
    let currP = lodash.cloneDeep(currentPath);


    const handleClick = (event) => {
       // console.log(event.target)
    }
    const getBread = (currPath,currMenu) => {
        let Breads = [];

        // console.log(currPath);
        while(currPath.length > 0){
            let breadId = currPath.shift();

            let breadItem = currMenu[currMenu.findIndex(item => item.id == breadId)];

            if(breadItem.route){
                Breads.unshift(<span key={breadItem.id}><Link to={breadItem.route}>{ ((currPath.length)?" / ":"") + breadItem.name}</Link></span>)
            }else{
                Breads.unshift(<span key={breadItem.id}><span>{breadItem.name}</span></span>)
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