import lodash from 'lodash';

// 在路由中通过键名找到某个参数的值
const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`,'i');
    let r = window.location.search.substr(1).match(reg);

    if(r != null) return decodeURI(r[2]);
    return null;
}


const isPlainObj = (obj) => {
    return Object.keys(obj).length == 0;
}

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


module.exports = {
    queryURL,
    arrayToTree,
    isPlainObj
}