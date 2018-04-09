import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

var namespace = 'manager';

class ManagerDetail extends commonDetail{

    constructor(props){
        super(props,{namespace:namespace})
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
    let detail = state[namespace+"/detail"]

    return {detail}
}

export default connect(mapStateProps)(ManagerDetail)

