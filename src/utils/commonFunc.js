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
    sha1_encrypt
}