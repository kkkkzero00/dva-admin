import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert  } from 'antd';
import config from 'utils/config'
import './index.less';
const FormItem = Form.Item;


const Login = ({login,dispatch,form:{getFieldDecorator,validateFieldsAndScroll}}) => {
    const {loginLoading,isSmallScrean} = login;
    
    // console.log(arguments)

    function handleOk(){
       validateFieldsAndScroll( async (errors,values) => {
            // console.log(errors)
            if(errors) return;
            // console.log(1231)
            dispatch({type:'login/login',payload:values})
    
        })
    }

    // console.log(login)
    return (
        <div className="container">
            <div className="login-form" style={isSmallScrean?{width:240}:{}}>
                <div className="logo">
                    <span>
                        <img alt="logo" src={config.logo}/>
                        <span className="title">Dva Admin</span>
                    </span>
                </div>
                <Form>
                    <FormItem hasFeedback>
                        {getFieldDecorator('username',{
                            rules:[
                                {
                                    required:true
                                }
                            ]
                        })(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
                    </FormItem>

                    <FormItem hasFeedback>
                        {getFieldDecorator('password',{
                            rules:[
                                {
                                    required:true,
                                }
                            ]
                        })(<Input size="large" onPressEnter={handleOk} placeholder="Password" />)}
                    </FormItem>

                    <div className="message" style={{width:"100%"}}>
                        {(()=>{   
                            // console.log(login.hasTriggerLogin)
                            switch(login.hasTriggerLogin){
                                case 0:
                                    return '';
                                case 1:
                                    return <Alert message={login.loginMessage} type="success" showIcon />;
                                case 2:
                                    return <Alert message={login.loginMessage} type="error" showIcon />;
                            }
                        })()}
                    </div>

                    <Row>
                        <Button type="primary" 
                                size="large" 
                                onClick={handleOk} 
                                loading={loginLoading}
                                style={{width:"100%"}}> Sign in </Button>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    form:PropTypes.object,
    dispatch:PropTypes.func,
    login:PropTypes.object
}

const mapStateProps = (state)=>{
    let {login,app} = state;
    // console.log(state)
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }

    login = {...login,isSmallScrean:app.isSmallScrean};

    return {login}
}

export default connect(mapStateProps)(Form.create()(Login))