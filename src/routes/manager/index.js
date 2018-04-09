import CommonListRoute from '../common/commonListRoute';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker ,InputNumber ,Spin} from 'antd';
// import moment from 'moment';
var namespace = "manager";

class Manager extends CommonListRoute{
  constructor(props){
    super(props,{namespace});
  }

  renderFuncConfig = () => {
    return {
        gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        id:(text,record)=>{
          // console.log(record)
          return <Link to={"/"+namespace+"/"+record.key+"/detail"}>{record.key}</Link>
        },
        role_id:(text,record)=>{
          
          let managerNames = [];
          Object.keys(text).forEach(item=>{
              managerNames.push(text[item].name)
          });
          managerNames = managerNames.join(",");

          return <span>{managerNames}</span>
        }
    }
  }
}

const mapStateProps = (state)=>{
    let {app:{isSmallScrean,isMiddleScrean}} = state;

    return {[namespace]:{...state[namespace],isSmallScrean,isMiddleScrean}}
}

export default connect(mapStateProps)(Manager);