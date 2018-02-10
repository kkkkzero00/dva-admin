import {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert,Icon  } from 'antd';

import SelectBox from 'components/IndexPage/selectBox';
import './indexPage.less'



const FormItem = Form.Item;



const IndexPage = ({indexPage,dispatch}) => {

    const selectBoxProps ={

        list:[
            {id:1,name:'lady gaga'},
            {id:2,name:'katy perry'},
            {id:3,name:'rihanna'},
            {id:4,name:'taylor swift'},
            {id:5,name:'adele'}
        ]

    }

    const jsonpCallback = (data) => {
        console.log('获得 X 数据:' + data.x);
    }

    const crossDomain = () => {
        dispatch({type:'indexPage/crossDomain'});
        // let script = document.createElement("script");
        // script.src = "http://127.0.0.1:3000?callback=jsonpCallback";
        // document.body.insertBefore(script, document.body.firstChild);
        
    }

    return (
        <div>
           <SelectBox {...selectBoxProps}/>

           <Button type="primary" onClick={crossDomain}>跨域测试</Button>
        </div>
    )
}

IndexPage.propTypes = {
    indexPage:PropTypes.object,
    dispatch:PropTypes.func,

}

const mapStateProps = (state)=>{
    let {indexPage,app} = state;
   
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    // console.log(state)
    return {indexPage}
}

export default connect(mapStateProps)(IndexPage)