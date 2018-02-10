'use strict';
// "start": "dora --plugins \"proxy,webpack,webpack-hmr\"",
/*的start命令中，可以看到使用 dora 工具的相关内容，其中proxy就是dora的一个插件，
在你的项目不需要代理的时候，去除proxy插件即可。*/

const {config,userList} = require('./common');
const {api} = config;


const qs = require('qs');

//引入mock.js
const mockjs = require('mockjs');



module.exports = {
    [`POST ${api.login}`] (req,res) {
        const {username,password} = req.body;
        const user = userList.filter(item => item.username === username);


        if(user.length>0 && user[0].password == password){
            const now  = Date.now();
            // console.log(now);
            /*一天后过期*/
            let expireTime = (now + 24*60*60*1000);
            /*如果要做单点登录还要存储用户当前会话的id*/
            /*
                有三种：
                    同域：设置cookie的域为当前域
                    同父域：设置coolie的域为父域
             */
            res.cookie(
                'u_Tok',
                JSON.stringify({id:user[0].id,deadline:expireTime}),
                {
                    expire:new Date(expireTime),
                    maxAge:9000000,
                    // httpOnly:true
                }
            );

            res.json({success:true,message:'OK'});
        }else{
            res.status(400).end();
        }    
    },

    [`GET ${api.logout}`] (req,res){
        res.clearCookie('u_Tok');
        res.status(200).end();
    }
};