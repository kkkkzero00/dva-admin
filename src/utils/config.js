const HJKAPI = '/api/v1'

module.exports = {
    name: 'HJK ROOM',
    footerText:'HJK Design ',
    logo:'logo.png',

    defaultPages:['/login'],
    apiPrefix:HJKAPI,
    
    api:{
        login:`${HJKAPI}/user/login`,
        logout:`${HJKAPI}/user/logout`,

        getMenus:`${HJKAPI}/menus`,
        userPermission:`${HJKAPI}/user/permission`,
        topAlumn:`top/album`,

        users:`${HJKAPI}/users`,
        user:`${HJKAPI}/user`
    },
    routes:['system','nav','menu'],
    logo:'/logo.png',
    commonPage:['/','/login'],
    baseUrl:"http://localhost:4000/"
}