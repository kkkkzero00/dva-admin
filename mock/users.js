'use strict';
// "start": "dora --plugins \"proxy,webpack,webpack-hmr\"",
/*的start命令中，可以看到使用 dora 工具的相关内容，其中proxy就是dora的一个插件，
在你的项目不需要代理的时候，去除proxy插件即可。*/

const qs = require('qs');
const {config,userList,Role} = require('./common');
const {api} = config;

//引入mock.js
const mockjs = require('mockjs');

module.exports = {
    [`GET ${api.users}`] (req,res) {
        // console.log(req)
        const params = qs.parse(req.query);
        let {currPage,pageSize,...otherParams} = params;
        console.log(otherParams);
        // console.log(limit)
        const data = mockjs.mock({
          'data|1000': [
            {
              key:'@id',
              name: '@name',
              phone: /^1[34578]\d{9}$/,
              'age|11-99': 1,
              address: '@county(true)',
              isMale: '@boolean',
              email: '@email',
              createTime: '@datetime',
              avatar () {
                return mockjs.Random.image('100x100', mockjs.Random.color(), '#757575', 'png')
              },
            },
          ],
        });
        

        // if(otherParams.length){
        //     console.log(otherParams);
        //     // data = data.filter()
        // }
        // console.log(data)
        res.status(200).json({
            success:true,
            data:data.data.slice((currPage-1)*pageSize,(currPage*pageSize)),
            total:data.data.length
        });
        // console.log(res);
    },

    [`GET ${api.userPermission}`] (req,res) {
        const cookie = req.headers.cookie;
        // console.log(cookie);
        const cookieArr = qs.parse(cookie.replace(/\s/g,''),{delimiter:';'})
        // let user_id = cookie.u_Tok
        // console.log(cookieArr)
        let response ={} ,user = {}

        if(!cookieArr.u_Tok){
            res.status(200).send({message:'Not Login'});
            return;
        }
        let token = JSON.parse(cookieArr.u_Tok);
        
        /*验证token有没有过期*/
        if(token)
            response.success = token.deadline > new Date().getTime()
        
        if(response.success){
            let userInfo = userList.filter(_ => _.id == token.id);
            if(userInfo.length > 0){
                const role = Role.filter(item => item.id == userInfo[0].roleId);
                // console.log(role)
                user.role = role[0];
                user.username = userInfo[0].username;
                user.id = userInfo[0].id
            }
        }

        response.user = user;

        res.json(response);
    }
};