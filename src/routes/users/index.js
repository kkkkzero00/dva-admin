// import React,{ Component,PureComponent ,Fragment} from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker ,InputNumber ,Spin} from 'antd';
// import moment from 'moment';
// import axios from 'axios';
// import config from 'utils/config';

// import { SearchForm ,TableList ,CreateModal} from 'components/Users'
// import './index.less';

// const FormItem = Form.Item;
// const {RangePicker} = DatePicker;
// const {Option} = Select;
// const confirm = Modal.confirm;


import CommonListRoute from '../common/commonListRoute';


class Users extends CommonListRoute{
  constructor(props){
    super(props,{name:'users'});
  }
  renderFuncConfig = () => {
    return {
        gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        username:(text,record)=>{
          // console.log(record)
          return <Link to={"/users/"+record.key+"/detail"}>{text}</Link>
        }
    }
  }
  /**
   * [自定义功能按钮]
   * @return {[type]} [description]
   */
  // renderCustomBtn = () =>{
  //   return [
  //     {
  //       key:'getTitle',
  //       style:{},
  //       onClick:(e)=>{
  //         console.log();
  //         this.props.dispatch({type:'users/getTitle'});
  //       },
  //       type:'action',
  //       name:'获取标题'
  //     },
  //     {
  //       key:'getUser',
  //       name:'获取用户',
  //       type:'action'
  //     }
  //   ]
  // }
}

const mapStateProps = (state)=>{
    let {app} = state;
    let users = state.users;

    let {isSmallScrean,isMiddleScrean} = app;

    users = {...users,isSmallScrean,isMiddleScrean};

    return {users}
}

export default connect(mapStateProps)(Users)