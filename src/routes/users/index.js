import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker ,InputNumber ,Spin} from 'antd';

import CommonListRoute from '../common/commonListRoute';


var namespace = 'users'

class Users extends CommonListRoute{
  constructor(props){
    super(props,{namespace});
  }
  renderFuncConfig = () => {
    return {
        gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        username:(text,record)=>{
          // console.log(record)
          return <Link to={"/"+namespace+"/"+record.key+"/detail"}>{text}</Link>
        },
        // uploadBtn:()=>{
        //   return <a onClick={}>上传</a>
        // }
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
    let {app:{isSmallScrean,isMiddleScrean}} = state;

    return {[namespace]:{...state[namespace],isSmallScrean,isMiddleScrean}}
}


export default connect(mapStateProps)(Users)