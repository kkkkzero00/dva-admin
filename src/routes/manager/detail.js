import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

var namespace = 'manager/detail';
var title = '管理员';

class ManagerDetail extends commonDetail{

    constructor(props){
        super(props,{namespace,title})
    }
    
    renderFuncConfig = () => {
        return {
            gender: (text) => <span>{(text == 1)? '男': '女'}</span>,
        }
    }

}

ManagerDetail.propTypes = {


}

const mapStateProps = (state)=>{
    let {app} = state;
    // console.log(state);
    let detail = state[namespace]

    return {detail}
}

export default connect(mapStateProps)(ManagerDetail)

