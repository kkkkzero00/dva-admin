import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert  } from 'antd';
const FormItem = Form.Item;

const Login = ({login,dispatch,form:{getFieldDecorator,validateFieldsAndScroll}}) => {
    const {loginLoading} = login;
    
    // console.log(arguments)

    function handleOk(){
        validateFieldsAndScroll((errors,values) => {
            // console.log(errors)
            if(errors) return;
            // console.log(1231)
            dispatch({type:'login/login',payload:values})
        })
    }

    // console.log(login)
    return (
        <div>
            <div className="logo"></div>
            <form>
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
                    <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}> Sign in </Button>
                </Row>
            </form>
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
    // console.log(state)
    return {login}
}

export default connect(mapStateProps)(Form.create()(Login))