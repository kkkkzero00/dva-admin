
// 在路由中通过键名找到某个参数的值
const queryURL = (name) => {
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`,'i');
    let r = window.location.search.substr(1).match(reg);

    if(r != null) return decodeURI(r[2]);
    return null;
}


module.exports = {
    queryURL
}