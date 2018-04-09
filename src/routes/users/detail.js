import commonDetail from '../common/commonDetail';
import { connect } from 'dva';

class UserDetail extends commonDetail{

    constructor(props){
        super(props,{name:'users'})
    }
    // render(){
    //     return (
    //         <div>
    //            Detail
    //         </div>
    //     )
    // }

}

UserDetail.propTypes = {


}

const mapStateProps = (state)=>{
    let {app} = state;
    // console.log(state);
    let detail = state['users/detail']

    return {detail}
}

export default connect(mapStateProps)(UserDetail)

