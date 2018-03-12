const HJKAPI = '/api/v1'
const TP5AdminApi = 'http://localhost/framework/gitTest/hy-admin2.0/TP5Admin/public/index.php'

module.exports = {
    name: 'HJK ROOM',
    footerText:'HJK Design ',
    defaultPages:['/login'],
    apiPrefix:HJKAPI,
    isUseMock:true,
    api:{
        checkUserExist:`${HJKAPI}/user/checkUserExist`,
        logout:`${HJKAPI}/user/logout`,

        getMenus:`${HJKAPI}/menus`,
        userPermission:`${HJKAPI}/user/permission`,
        topAlumn:`top/album`,
        checkAuthRoute:`${HJKAPI}/checkAuthRoute`,
        users:`${HJKAPI}/users`,
        user:`${HJKAPI}/user`
    },
    api2:{
        checkUserExist:`${TP5AdminApi}/checkUserExist`,
        userPermission:`${TP5AdminApi}/userPermission`,
        logout:`${TP5AdminApi}/logout`,
        checkAuthRoute:`${TP5AdminApi}/checkAuthRoute`,
        users:`${TP5AdminApi}/user/lists`,
        user:`${TP5AdminApi}/user`,
    },
    routes:['system','nav','menu'],
    logo:'/logo.png',
    commonPage:['/','/login','/error'],
    baseUrl:"http://localhost:4000/"
}