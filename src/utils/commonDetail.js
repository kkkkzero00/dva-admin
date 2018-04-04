function createDetail(options) {
  const { namespace} = options;


  return {
    namespace: `${namespace}/detail`,
    state: {
      detail_id:0,
      message:null,
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        history.listen(({ pathname }) => {

            let routePattern = new RegExp(namespace+"/[0-9]+/detail","g")
            if(pathname.match(routePattern)){
                let pattern = /(\d)+/g;
                let paths = pathname.match(pattern);

                if(paths){
                    dispatch({type:'updateState',payload:{detail_id:paths[0]}});
                    dispatch({type:'query',payload:{id:paths[0]}});
                }
            } 
            
        })
      },
    },
    effects: {
      *query({payload},{put,call,select}){
          // console.log(namespace)
          const {read} = require('services/'+namespace+"/");

          // console.log(read);
          let res = yield call(read,payload.id);
          console.log(res)
          if(res.success){
              yield put({type:'updateState',payload:{message:res.data}});
          }
      }
    },
    reducers: {
        updateState(state,{payload}){
            return {
                ...state,
                ...payload
            }
        },
    }
  };
}

export default createDetail;
