import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert  } from 'antd';
const FormItem = Form.Item;

const LineChart = () => {


    return (
        <div>
           lineChart
        </div>
    )
}

LineChart.propTypes = {


}

const mapStateProps = (state)=>{
    let {lineChart,app} = state;
   
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    // console.log(state)
    return {lineChart}
}

export default connect(mapStateProps)(LineChart)