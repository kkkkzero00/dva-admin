import React,{ Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Col,Form, Input, Alert,Spin} from 'antd';

const FormItem = Form.Item;

class Detail extends Component{
    constructor(props,{namespace,title}){
        super(props);
        this.namespace = namespace;
        this.title = title;
        this.renderDetail = this.renderDetail.bind(this);

    }
    renderDetail(message,config){
        // console.log(this);
        var renderConfig = null;
        if(this.renderFuncConfig){
            renderConfig = this.renderFuncConfig();
        }
        // console.log(config);
        // console.log(message);

        return Object.keys(config).map((item,index) => {
            let temp = message[item];

            return <Col span={24} key={index} style={{padding:"5px"}}>
                        <span style={{fontWeight:"bold"}}>{config[item]['title']}：  </span><span>{(renderConfig&&renderConfig[item])?renderConfig[item](temp):temp}</span>
                    </Col>
        })

    }


    render(){
        
        let {detail:{message,detail_config}} = this.props;

        // console.log(message);

        let style = {
            
            container:{
                width:"100%",
                minHeight:"300px",
                margin:"0 auto",
                backgroundColor:"#fff",
                padding:"28px",
            },
            title:{
                
                display:"block",
                height:"58px",
                lineHeight:"58px",
                fontSize:"24px",
                borderBottom:"1px solid #ccc"
            }
            
        }

        // console.log(namespace)
        return (
            <div style={style.container}>
               <Row gutter={24}>
                 <Col><h3 style={style.title}>{this.title?this.title:''} 详情</h3></Col>
               </Row>
               {message?
                (<Row style={{marginTop:"10px"}}>
                      <Col span={12}>
                           <Row>{this.renderDetail(message,detail_config)}</Row>
                      </Col>
                  </Row>):
                 <Spin style={{width:"100%"}}/>}
                 
            </div>
        )
    }

}

Detail.propTypes = {


}


export default Detail;

