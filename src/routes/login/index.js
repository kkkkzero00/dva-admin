import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert  } from 'antd';
import config from 'utils/config'
import './index.less';
import {aes_encrpyt,sha1_encrypt} from 'utils/commonFunc';



const FormItem = Form.Item;


const Login = ({login,dispatch,form:{getFieldDecorator,validateFieldsAndScroll}}) => {
    const {loginLoading,isSmallScrean} = login;
    // console.log(arguments)

    function handleOk(){
        

       validateFieldsAndScroll( async (errors,values) => {
            // console.log(errors)
            if(errors) return;

            let {account,password,token} = values;
            // console.log(token)
            var key = token.slice(0,10);
            var iv = token.slice(10);

            account = aes_encrpyt(account,key,iv);

            password = sha1_encrypt(password,key);

            dispatch({type:'login/login',payload:{account,password}})
    
        })
    }


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
                        {getFieldDecorator('account',{
                            rules:[
                                {
                                    required:true,
    
                                }
                            ]
                        })(<Input size="large" onPressEnter={handleOk} placeholder="管理员账号" />)}
                    </FormItem>

                    <FormItem hasFeedback>
                        {getFieldDecorator('password',{
                            rules:[ {required:true,}]
                        })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="管理员密码" />)}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('token',
                            {initialValue:login.token}
                        )(<Input type="hidden"/>)}
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
    // console.log(login)
    login = {...login,isSmallScrean:app.isSmallScrean};

    return {login}
}

export default connect(mapStateProps)(Form.create()(Login))