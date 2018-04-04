 'use strict';
// "start": "dora --plugins \"proxy,webpack,webpack-hmr\"",
/*的start命令中，可以看到使用 dora 工具的相关内容，其中proxy就是dora的一个插件，
在你的项目不需要代理的时候，去除proxy插件即可。*/

const qs = require('qs');
const crypto = require('crypto');

const form_token = 'sdfhjrt';
const {config,userList,Role} = require('./common');
const {api} = config;


//引入mock.js
const mockjs = require('mockjs');

/**
 * [查询指定值在表中是否存在]
 * @param  {[type]} array    [description]
 * @param  {[type]} key      [description]
 * @param  {String} keyAlias [description]
 * @return {[type]}          [description]
 */
const queryTable = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data = null;

  array.forEach(item => {
    if(item[keyAlias] === key) {
        data = item;
        return;
    }
  })

  return data
}


/**
 * [isArray 判断对象是否为数组]
 * @param  {[type]}  o [description]
 * @return {Boolean}   [description]
 */
function isArray(o){
    return Object.prototype.toString.call(o)=='[object Array]';
}

let database = mockjs.mock({
  'data|1000': [
    {
      key:'@id',
      name: '@name',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      'gender|1-2': 1,
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return mockjs.Random.image('100x100', mockjs.Random.color(), '#757575', 'png')
      },
    },
  ],
});

let userTable = database.data;

function checkToken(token,cookies){
    const cookieArr = qs.parse(cookies.replace(/\s/g,''),{delimiter:';'});
    const {formToken} = cookieArr;
    // console.log(token)
    // console.log(formToken)
    return formToken == token;
}

module.exports = {
    [`GET ${api.userPermission}`] (req,res) {
        const cookie = req.headers.cookie;
        // console.log(cookie);
        const cookieArr = qs.parse(cookie.replace(/\s/g,''),{delimiter:';'})
        // let user_id = cookie.u_Tok
        // console.log(cookieArr)
        let response ={} ,user = {}
        let success = false;

        if(!cookieArr.u_Tok){
            res.status(200).send({message:'Not Login',success:false});
            return;
        }
        let token = JSON.parse(cookieArr.u_Tok);
        
        /*验证token有没有过期*/
        if(token)
            success = token.deadline > new Date().getTime()
        
        if(success){
            let userInfo = userList.filter(_ => _.id == token.id);
            if(userInfo.length > 0){
                const role = Role.filter(item => item.id == userInfo[0].roleId);
                // console.log(role)
                user.role = role[0];
                user.username = userInfo[0].username;
                user.id = userInfo[0].id
            }
        }

        response.userInfo = user;

        res.json({data:response,success});
    },
    [`GET ${api.getToken}`] (req,res) {
        

        const cookieArr = qs.parse(req.headers.cookie.replace(/\s/g,''),{delimiter:';'});
        const {formToken} = cookieArr;
        let token ;

        if(!formToken){
            const now  = Date.now();
            // console.log(now);
            /*30分钟后过期*/
            let expireTime = (now + 30*60*1000);
            let md5 = crypto.createHash('md5');
            token = md5.update(form_token+expireTime).digest('hex');
            res.cookie(
                'formToken',
                token,
                {
                    expire:new Date(expireTime),
                    maxAge:9000000,
                    // httpOnly:true
                }
            );
        }
        else{
            token = formToken;
        }
        
        

        res.status(200).json({
            success:true,
            data:token,
        });
    },

    [`GET ${api.users}`] (req,res) {

        // console.log(req)
        const params = qs.parse(req.query);
        let {currPage,pageSize,...otherParams} = params;
        // console.log(otherParams);
        // console.log(limit)
      
        
        let newData = userTable;
        if(Object.keys(otherParams)){

            Object.keys(otherParams).forEach(key => {

                newData = newData.filter((item) => {
                    let res = false;
                   
                    if({}.hasOwnProperty.call(item, key)){

                        switch(key.toLowerCase()){
                            case 'createtime':
                                let timesParam = otherParams[key].split(',');
                                // console.log(timesParam);

                                const startTime = new Date(timesParam[0]).getTime();
                                const endTime = new Date(timesParam[1]).getTime();

                                const itemTime = new Date(item[key]).getTime();

                                if(startTime && endTime){
                                    res = (itemTime >= startTime) && (itemTime <= endTime)
                                }
                                
                                break;
                            default:
                                //强制转成字符串比较
                                res = (String(item[key]).trim().indexOf(decodeURI(otherParams[key]).trim())> -1);  
                                break;
                        }

                        return res;
                    }

                    return false;
                })
            })
            
        }
        // console.log(data)
        res.status(200).json({
            success:true,
            data:newData.slice((currPage-1)*pageSize,(currPage*pageSize)),
            total:newData.length
        });
        // console.log(res);
    },

    [`GET ${api.user}`] (req,res) {

    },

    [`POST ${api.user}`] (req,res) {
        const newItem = req.body;

        if(checkToken(newItem.token,req.headers.cookie)){
            newItem.createTime = mockjs.mock('@now');
            newItem.avatar = newItem.avatar || mockjs.Random.image('100x100', mockjs.Random.color(), '#757575', 'png');
            newItem.key = mockjs.mock('@id');

            userTable.unshift(newItem);

            res.status(200).json({message:"新增成功！",success:true});

        }else{
            res.status(501).json({message:"非法提交！",success:false});
        }

        
        
    },

    [`PUT ${api.user}/:id`] (req,res) {
        // const {id} = req.params;
        
        let {id,...updateItem} = req.body;
        let isExist = false;

        if(checkToken(updateItem.token,req.headers.cookie)){
            userTable.forEach((item,index) => {
                if(id == item.key){
                    isExist = true;
                    userTable[index] = {...item,...updateItem}
                    console.log({...item,...updateItem})
                    return;
                }
            });


            if(isExist) {
                res.status(201).json({message:'修改成功！'});
            }else{
                res.status(404).json({message: '找不到用户！'});
            }
        }else{
            res.status(501).json({message:"非法提交！",success:false});
        }
    },
    [`DELETE ${api.user}`] (req,res) {
        const params = qs.parse(req.query[0]);
        let {deleteId,token} = params;
        // console.log(deleteId)
        // console.log(isArray(deleteId))
        if(checkToken(token,req.headers.cookie)){
            if(isArray(deleteId)){

                let isExist = deleteId.every((item)=>!!queryTable(userTable,item,'key'))


                if(isExist){
                    userTable = userTable.filter(item => !deleteId.some(_ => _ === item.key));
                    res.status(200).json({message:"成功删除"+deleteId.length+"条数据！"});

                }else{
                    res.status(404).json({message:"删除失败，选中的数据在数据库不存在！"});
                }

            }else{
                let isExist = !!(queryTable(userTable,deleteId,'key'));
            
                if(isExist){
                    userTable = userTable.filter(item => (item.key != deleteId));

                    res.status(200).json({message:"成功删除1条数据！"});
                }else{
                    res.status(404).json({message:"删除失败，该条数据不存在！"});
                }
            }
        }else{
            res.status(501).json({message:"非法提交！",success:false});
        }
        
    },

    [`GET ${api.checkAuthRoute}`](req,res){
        const params = qs.parse(req.query);
        let {path} = params;

        const cookie = req.headers.cookie;
        // console.log(cookie);
        const cookieArr = qs.parse(cookie.replace(/\s/g,''),{delimiter:';'})
        let {menuRoutes} = cookieArr;

        menuRoutes = JSON.parse(menuRoutes);

        let hasAuth = menuRoutes.filter(item => item == path);

        console.log(hasAuth)

        if(hasAuth.length!=0){
            res.status(200).json({message:"路径合法！",success:true});
        }else{
            res.status(500).json({message:"路径非法！",success:false});
        }
    }
    
};