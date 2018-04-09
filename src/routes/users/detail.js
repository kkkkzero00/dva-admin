import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

var namespace = 'users/detail';
var title = '用户';

class UserDetail extends commonDetail{

    constructor(props){
        super(props,{namespace,title})
    }

    renderFuncConfig = () => {
        return {
            gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        }
    }


}

UserDetail.propTypes = {


}

const mapStateProps = (state)=>{
    let {app} = state;

    let detail = state[namespace]

    return {detail}
}

export default connect(mapStateProps)(UserDetail)

