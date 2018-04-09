import {assign} from 'utils/commonFunc'

function createDetailModel(model) {
  var {namespace} = model;

  namespace = namespace.split("/");

  var defaultModel = {
      state: {
        detail_id:0,
        message:null,
        detail_config:{}
      },
      subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
          history.listen(({ pathname }) => {
              // console.log(namespace);

              let routePattern = new RegExp(namespace[0]+"/[0-9]+/"+namespace[1],"g")
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
            const {read} = require('services/'+namespace[0]+"/");

            // console.log(read);
            let res = yield call(read,payload.id);
            // console.log(res)
            if(res.success){
                yield put({type:'updateState',payload:{message:res.data,detail_config:res.config}});
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

  defaultModel = assign(defaultModel, model); 

  return defaultModel;  
}

export default createDetailModel;