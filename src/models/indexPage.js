import {query} from 'services/indexPage'


export default {

  namespace: 'indexPage',

  state: {
    record : 0,
    current: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *crossDomain({ payload }, { call, put }) {  
       let data = yield call(query);

       console.log(data)
    },
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
  },

};
