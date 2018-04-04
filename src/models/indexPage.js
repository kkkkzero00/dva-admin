import {query,getTopAlbum} from 'services/indexPage'


export default {

  namespace: 'indexPage',

  state: {
    carousel:{
      albums:[],
      total:0,
      start:0,//后台数据开始的坐标
      end:0,//后台数据结束的坐标
      maxItem:45,//页面最大限制显示的条目数
      offset:0,//页面每三个ul偏移量
      limit:15,//每次限取多少条
      itemNum:5//每个ul有多少个li（每个可视区域显示多少张图片）
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

      if (location.pathname == '/' || location.pathname == '/indexPage') {
        // dispatch({
        //   type:'getCarouselItem',
        //   payload:{offset:0,limit:15,direct:2}
        // });
      }
    },
  },

  effects: {
    *crossDomain({ payload }, { call, put }) {  
      let data = yield call(query);

      console.log(data)
    },

    *getCarouselItem({payload},{call,put,select}){
      
      let {indexPage} = yield select();
      let {carousel} = indexPage;
      let {start,end,maxItem,albums} = carousel;

      if(payload){
        var {offset,limit,direct} = payload
      }else{
        /*在作用域块内声明变量的话最好不要用let 否则块作用域执行完后这个变量会被销毁，所以这里用var*/
        var {offset,limit} = carousel;
        var direct = 0;
      }

      // console.log(offset)
      let data = yield call(getTopAlbum,{offset,limit});
      // console.log(data.albums)

      let {success,code,total,message} = data;

      // console.log(data);

      //向左
      if(direct == 1){

            let cloneAlbums = data.albums.slice(0);
            albums = cloneAlbums.concat(albums);
            start = start - limit;
            
            //如果页面上渲染的节点超过限制的数量就对末尾的进行清除
            if((end-start) > maxItem){
                //splice 会改变原数组，而且返回值是被删除出来的那个数组
                albums = albums.slice(0,maxItem);
                end = end - limit;
            }

      }else if(direct == 2){

     
            albums = albums.concat(data.albums);
           
            end = end + limit;

            //如果页面上渲染的节点超过限制的数量就对开头的的进行清除
            if((end-start) > maxItem){
                  start = start + limit;
                  //把开头的某几个给去掉
                  albums = albums.slice(limit);
                  
            } 
           
      }
      // console.log(albums.length)
      
      if(success){
          yield put({ 
                  type:"updateCarousel",
                  payload:{
                      ...carousel,
                      albums,
                      total,
                      message,
                      limit,
                      start,
                      end,
                      maxItem
                  }
                });
      }

    }
  },

  reducers: {
    updateCarousel(state, {payload}) {
      // console.log(payload);
      return { 
        ...state,
        carousel:{...payload}
      };
    },
  },

};
