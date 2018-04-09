import lodash from 'lodash';
import CryptoJS from 'crypto-js';


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

function aes_encrpyt(content,key,iv) {
    var result;

    key = format_key(key);

    key = CryptoJS.enc.Utf8.parse(key);

    iv = CryptoJS.enc.Base64.parse(iv);

    var encrypt = CryptoJS.AES.encrypt(
        content, 
        key, 
        {
            iv: iv, 
            mode:CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }
    );

    result = encrypt.toString();

    return result;
}

/**
 * [isEqualObj 对象深比较函数]
 * @param  {[type]}  a [description]
 * @param  {[type]}  b [description]
 * @return {Boolean}   [description]
 */
function isEqualObj(a,b){
    if ( a === b ) { 
        return true; 
    } 

    if (!( a instanceof Object ) || !( b instanceof Object )) { 
        return false; 
    } 

    if ( a.constructor !== b.constructor ) { 
        return false; 
    } 

    if( a instanceof Array && b instanceof Array){

        for(var i=0, aLen = a.length;i<aLen;i++){
            if (!isEqualObj(a[i], b[i])) {
                return false;
            }
        }
    }else if(a instanceof Object && b instanceof Object){
        let akeys = Object.keys(a);
        for (var key of akeys) {
            
            if (a.hasOwnProperty(key)) {
                if (!b[key]) {
                    return false;
                }

                if (!isEqualObj(a[key], b[key])) {
                    return false;
                }

            }
        }
    }
    
    return true;
}

const assign = (target,...source) => {
    
    source.forEach(item =>{
        let type = Object.prototype.toString.call(target);
        if(target == null){
            target = item;
            return;
        }

        if(type != '[object Object]'){ 
            target = item;
            return;
        }else{
            Object.keys(item).forEach(k => {
                if(target[k] == undefined){
                    target[k] = item[k];
                }else{
                    let subType = Object.prototype.toString.call(target[k])
                    if(subType == '[object Object]'){
                        target[k] = assign(target[k],item[k])
                    }else{
                        target[k] = item[k];
                    }
                }
            })
        }
        
    });

    return target;
}
 
function format_key(key) {
    while (key.length < 16) {
        key = key + '\u0000';
    }
    return key;
}

function sha1_encrypt(value,key){
   return CryptoJS.SHA1(value+key).toString();
}


module.exports = {
    queryURL,
    arrayToTree,
    isPlainObj,
    aes_encrpyt,
    sha1_encrypt,
    isEqualObj,
    assign
}