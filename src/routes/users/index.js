import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert  } from 'antd';
const FormItem = Form.Item;

const Users = ({indexPage,dispatch}) => {


    return (
        <div>
           users
        </div>
    )
}

Users.propTypes = {

}

const mapStateProps = (state)=>{
    let {users,app} = state;
   
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    // console.log(state)
    return {users}
}

export default connect(mapStateProps)(Users)