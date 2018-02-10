const config = require('../src/utils/config')

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}
const EnumRoleType = {
    ADMIN:'admin',
    DEFAULT:'guest',
    DEVELOPER:'developer'
}

const Role = [
  {
    id:0,
    visit:'all',
    role: EnumRoleType.ADMIN,
  },
  {
    id:1,
    visit:'all',
    role: EnumRoleType.DEVELOPER,
  },
  {
    id:10,
    visit: ['0' ,'1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
]


const userList = [
 {
    id: 0,
    username: 'admin',
    password: 'admin',
    roleId: 0,
  }, 
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    roleId: 10,
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    roleId: 1,
  },
]


module.exports = {
    config,
    NOTFOUND,
    Role,
    userList
}