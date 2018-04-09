import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

var namespace = 'manager/detail';

class ManagerDetail extends commonDetail{

    constructor(props){
        super(props,{namespace})
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

