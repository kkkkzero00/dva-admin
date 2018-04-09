import React,{ Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Col,Form, Input, Alert  } from 'antd';

const FormItem = Form.Item;

class Detail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        // console.log(this.props)

        let style = {
            width:"100%",
            minHeight:"300px",
            margin:"0 auto",
            backgroundColor:"#fff"
        }

        return (
            <div style={style}>
               Detail
            </div>
        )
    }

}

Detail.propTypes = {


}


export default Detail;

