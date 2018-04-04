import CommonListRoute from '../common/commonListRoute';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker ,InputNumber ,Spin} from 'antd';
// import moment from 'moment';

class Manager extends CommonListRoute{
  constructor(props){
    super(props,{name:'manager'});
  }

  renderFuncConfig = () => {
    return {
        gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        id:(text,record)=>{
          // console.log(record)
          return <Link to={"/manager/"+record.key+"/detail"}>{record.key}</Link>
        }
    }
  }
  
}

const mapStateProps = (state)=>{
    let {app} = state;
    let manager = state.manager;
    // console.log(manager)
    let {isSmallScrean,isMiddleScrean} = app;

    manager = {...manager,isSmallScrean,isMiddleScrean};

    return {manager}
}

export default connect(mapStateProps)(Manager);