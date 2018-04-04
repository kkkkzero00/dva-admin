import React,{ Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Col,Form, Input, Alert  } from 'antd';

const FormItem = Form.Item;

class Detail extends Component{

    render(){
        return (
            <div>
               Detail
            </div>
        )
    }

}

Detail.propTypes = {


}

const mapStateProps = (state)=>{
    let {app} = state;
    // console.log(state);
    let detail = state['users/detail']

    return {detail}
}

export default connect(mapStateProps)(Detail)