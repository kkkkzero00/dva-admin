import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

var namespace = 'manager/detail';
var title = '管理员';

class ManagerDetail extends commonDetail{

    constructor(props){
        super(props,{namespace,title})
    }
    // render(){
    //     return (
    //         <div>
    //            Detail
    //         </div>
    //     )
    // }

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

