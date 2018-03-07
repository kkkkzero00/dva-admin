const { config } = require('./common')

const { api } = config
let database = [
  {
    id: '1',
    pid:'0',
    path:'1',
    icon: 'laptop',
    name: 'Index',
    route: '/indexPage',
    model:'indexPage',
    type:'system'
  },
  {
    id: '2',
    pid: '0',
    path:'2',
    name: 'Users',
    icon: 'user',
    route: '/users',
    model:'users',
    type:'system'
  },
  {
    id: '7',
    pid: '0',
    path:'7',
    name: 'Posts',
    icon: 'shopping-cart',
    route: '/post',
    model:'post',
    type:'nav'
  },
  {
    id: '21',
    pid: '2',
    path:'21-2',
    name: 'User Detail',
    route: '/users/:id',
    model:'user',
    type:'url'
  },
  {
    id: '3',
    pid: '0',
    path:'3',
    name: 'Request',
    icon: 'api',
    route: '/request',
    model:'request',
    type:'nav'
  },
  {
    id: '4',
    pid: '0',
    path:'4',
    name: 'UI Element',
    icon: 'camera-o',
    type:'nav'
  },
  {
    id: '41',
    pid: '4',
    path:'41-4',
    name: 'IconFont',
    icon: 'heart-o',
    route: '/UIElement/iconfont',
    model:'iconfont',
    type:'menu'
  },
  {
    id: '42',
    pid: '4',
    path:'42-4',
    name: 'DataTable',
    icon: 'database',
    route: '/UIElement/dataTable',
    model: 'dataTable',
    type:'menu'
  },
  {
    id: '43',
    pid: '4',
    path:'43-4',
    name: 'DropOption',
    icon: 'bars',
    route: '/UIElement/dropOption',
    model:'dropOption',
    type:'menu'
  },
  {
    id: '44',
    pid: '4',
    path:'44-4',
    name: 'Search',
    icon: 'search',
    route: '/UIElement/search',
    model:'search',
    type:'menu'
  },
  {
    id: '45',
    pid: '4',
    path:'45-4',
    name: 'Editor',
    icon: 'edit',
    route: '/UIElement/editor',
    model:'editor',
    type:'menu'
  },
  {
    id: '46',
    pid: '4',
    path:'46-4',
    name: 'layer (Function)',
    icon: 'credit-card',
    route: '/UIElement/layer',
    model:'layer',
    type:'menu'
  },
  {
    id: '5',
    pid: '0',
    path:'5',
    name: 'Recharts',
    icon: 'code-o',
    type:'nav'
  },
  {
    id: '51',
    pid: '5',
    path:'51-5',
    name: 'LineChart',
    icon: 'line-chart',
    route: '/charts/lineChart',
    model:'lineChart',
    type:'menu'
  },
  {
    id: '52',
    pid: '5',
    path:'52-5',
    name: 'BarChart',
    icon: 'bar-chart',
    route: '/charts/barChart',
    model:'barChart',
    type:'menu'
  },
  {
    id: '53',
    pid: '5',
    path:'53-5',
    name: 'AreaChart',
    icon: 'area-chart',
    route: '/charts/areaChart',
    model:'areaChart',
    type:'menu'
  },
  {
    id: '6',
    pid: '0',
    path:'6',
    name: 'Test Navigation',
    icon: 'setting',
    type:'nav'
  },
  {
    id: '61',
    pid: '6',
    path:'61-6',
    name: 'Test Navigation1',
    route: '/navigation/navigation1',
    model:'navigation1',
    type:'menu'
  },
  {
    id: '62',
    pid: '6',
    path:'62-6',
    name: 'Test Navigation2',
    route: '/navigation/navigation2',
    model: 'navigation2',
    type:'menu'
  },
  // {
  //   id: '621',
  //   pid: '62',
  //   path:'621-62-6',
  //   name: 'Test Navigation21',
  //   route: '/navigation/navigation2/navigation1',
  //   model: 'navigation1',
  //   type:'url'
  // },
  // {
  //   id: '622',
  //   pid: '62',
  //   path:'622-62-6',
  //   name: 'Test Navigation22',
  //   route: '/navigation/navigation2/navigation2',
  //   type:'url'
  // },
]

module.exports = {

  [`GET ${api.getMenus}`] (req, res) {
    const response = {},menus = {};
    response.success = true;
    
    response.menus = database;
    res.status(200).json(response)
  },
}
