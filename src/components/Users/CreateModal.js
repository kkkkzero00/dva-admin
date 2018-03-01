import {Component} from 'react';

import { Button,Form ,Icon ,Modal ,Alert } from 'antd';
import {isPlainObj} from 'utils/commonFunc';
import './createModal.less'

const FormItem = Form.Item;

class CreateModal extends Component {
  state = {
    confirmLoading:false
  }


  constructor(props){
    super(props);
  }

  handleOk = () => {
    let {modalType,onOk} = this.props;

    

    if(modalType == 'delete'){
        let {selectedRows} = this.props;

        let deleteId = null;

        if(selectedRows.length > 1){
          deleteId = selectedRows.map(item => item.key);
        }else{
          deleteId = selectedRows[0].key;    
        }

        onOk({deleteId},modalType);

        this.setState({
          confirmLoading:true
        })


        setTimeout(()=>{
            let {submitStatus} = this.props;
            this.setState({
              confirmLoading:false
            })
            if(submitStatus.ok){
                this.props.hideModalVisible();
            }
        },1000);
    }else{

        let {
          form:{validateFieldsAndScroll,getFieldDecorator,getFieldsValue},
        } = this.props;


        validateFieldsAndScroll((errors,vals) => {

          if (errors) {
            return
          }
          onOk(vals,modalType);
          this.setState({
            confirmLoading:true
          })

          setTimeout(()=>{
              let {submitStatus} = this.props;
              this.setState({
                confirmLoading:false
              })
              if(submitStatus.ok){
                  this.props.hideModalVisible();
              }
          },1000);
        })
    }
    
  }

  onCancel = () => {
    this.props.hideModalVisible();
  }

  

  renderModalForm = (list,type) => {
    if(type == 'delete'){

      let {selectedRows} = this.props;

      return <div style={{color:'red'}}>选中{selectedRows.length}条记录，是否要删除？</div>
    }


    let {createInputComponent,createInitValue,form:{getFieldDecorator}} = this.props;

    let newList = list.filter(item => !!(item.form) && !isPlainObj(item.form) && !!(item.form.type) && item.form.type.includes(type));

    let formItemLayout = {
      labelCol: {
        lg: { span: 4 },
        sm: { span: 6 },
        xs: { span: 5 },
      },
      wrapperCol: {
        lg: { span: 15 },
        sm: { span: 17 },
        xs: { span: 16 },
      },
    }

    return (
        <Form layout="horizontal">
          {newList.map(item => {
            let rules = (!!(item.form) && !isPlainObj(item.form))?((!!(item.form.rules)&&!isPlainObj(item.form.rules))?item.form.rules:''):''
            let inputOptions = { 
              initialValue:createInitValue(item,type),
              rules:[rules]
            }
            return (
                <FormItem {...formItemLayout} hasFeedback label={item.label} key={type+'-'+item.name}>
                  {getFieldDecorator(item.name,inputOptions)(createInputComponent(item))}
                </FormItem>
            )
          })}
        </Form>
    )

  }


  getAlertProps = () => {
    let {submitStatus} = this.props;
    let alertProps = {}
    switch(submitStatus.type){
      case 0:
        alertProps['type'] = 'info';
        break;
      case 1:
        alertProps['type'] = 'success';
        break;
      case 2:
        alertProps['type'] = 'error';
        break;
    }

    alertProps['message'] = submitStatus.message

    return alertProps;
  }

  render(){
    let {
      list,
      modalType,
      modalVisible,
      submitStatus
    } = this.props;

    let {confirmLoading} = this.state;
    // console.log(submitStatus)
    let title = null;
    switch(modalType.toLowerCase()){
      case 'add':
        title = '新增'
        break;
      case 'edit':
        title = '编辑'
        break;
      case 'delete':
        title = '删除'
        break;

    }
    return (
      <Modal
          className={"createModal-"+modalType}
          title={title}
          confirmLoading={confirmLoading}
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={this.onCancel}>
          {this.renderModalForm(list,modalType)}
          {!!(submitStatus.type)?<Alert {...this.getAlertProps()} showIcon />:''}
      </Modal>
    )
  }
}


export default Form.create({})(CreateModal);
