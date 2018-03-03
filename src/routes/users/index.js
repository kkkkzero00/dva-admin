import React,{ Component,PureComponent ,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker } from 'antd';
import moment from 'moment';

import Grid from 'components/Grid';
const { HRow, HCol } = Grid;

import { SearchForm ,TableList ,CreateModal} from 'components/Users'
import './index.less';

const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const {Option} = Select;
const confirm = Modal.confirm;

const userConfig = [
    {
        name:'name',
        label:'姓名',
        form:{
          type:['add','edit'],
          rules:{
              type:'string',
              required:true
          }
        },
        search:{
          open:true,
          rules:{
              type:'string',
              required:true
          }
        }
        
    },{
        name:'gender',
        label:'性别',
        form:{
          type:['add','edit'],
          rules:{
              type:'number',
              // required:true
          }
        },
        search:{
          open:true,
          rules:{
            type:'number'
          }
        }, 
        type:'select',
        options:[{id:1,name:'男'},{id:2,name:'女'}],

    },{
        name:'age',
        label:'年龄',
        form:{
          type:['add','edit'],
          rules:{
              pattern:/^[0-9].*$/,
              required:false,
              message:"请输入正确格式"
          }
        },
        search:{
          open:true,
        }, 
        
    },{
        name:'createTime',
        label:'创建时间',
        form:{},
        search:{
          open:true,
          rules:{
              type:'array',
              message:'please select time'
          }
        }, 
        type:'RangePicker',
        
    },{
        name:'phone',
        label:'电话',
        form:{
          type:['add','edit'],
          rules:{
              pattern:/^1[34578]\d{9}$/,
              message:'电话格式不正确！'
          }
        },
        search:{
          open:true,
          rules:{
              pattern:/^1[34578]\d{9}$/,
              message:'电话格式不正确！'
          }
        }, 
        
    },{
        name:'address',
        label:'地址',
        form:{
          type:['add','edit']
        },
        search:{
            open:true
        }, 
        type:'address'
    },{
        name: 'email',
        label:'电子邮箱',
        form:{
          type:[]
        },
    },{
        name:'avatar',
        lable:'头像',
        type:'file',
    }
];

const ToolBtn = ({selectedRows,onAdd,onEdit,onDelete}) => {
    let selectedRowsLen = selectedRows.length;

    let style = {
        marginRight:10
    }

    return (
      <div className="toolBtn">

          <Button type="primary" className="add-btn" onClick={onAdd}>新增</Button>
          {(selectedRowsLen>0)?
              <Button type="ghost" 
                      className="edit-btn"
                      key="edit-btn"
                      {...((selectedRowsLen>1)?{disabled:true}:{onClick:onEdit})}>编辑</Button>:''}
          {
            (selectedRowsLen>0)?
              (selectedRowsLen>1)?
              (<Button
                  type="ghost"
                  className="muti-del-btn"
                  key="muti-del-btn"
                  onClick={onDelete}>批量删除</Button>):
              (<Button 
                  type="ghost"
                  className="del-btn"
                  key="del-btn"
                  onClick={onDelete}>删除</Button>):''
          }
          

      </div>
    )
}


class Users extends Component {

    state = {
      // expandForm: false,
      selectedRows: [],
      currentRow:{},
      modalVisible:false,//弹出窗显示状态
      modalType:'add',//弹出窗的类型（添加用户，编辑用户）
      formVal: {},
      columns:[
          {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',           
            render: (text) => <img alt={'avatar'} width={24} src={text} />,
          }, 
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => text,
          },{
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => <span>{(text == 1)? '男': '女'}</span>,
          }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
          }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
          }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
          },
          
      ]
    };

    constructor(props){
      super(props);
    } 

    getUsersData(currPage=1,pageSize=10){
        this.props.dispatch({type:'users/query',payload:{currPage,pageSize}})
    }
    
    componentWillMount(){
        this.getUsersData();
    }

    /**
     * [创建初始化表单控件的组件]
     * @param  {String} options.type    [description]
     * @param  {[type]} options.options [description]
     * @return {[type]}                 [description]
     */
    createInputComponent = (item) => {
        let {type='text',options,label} = item;
        let { isSmallScrean } = this.props.users;
        let inputSize = isSmallScrean?'small':'default';

        switch(type.toLowerCase()){
            case 'rangepicker':
                return <RangePicker
                        size={inputSize}
                        style={{width:'auto'}}
                        format="YYYY-MM-DD"
                        placeholder={['开始时间', '结束时间']}/>

            case 'select':
                return (
                    <Select size={inputSize}>
                      {options.map((opt)=>{
                        return <Option value={opt.id} key={opt.id}>{opt.name}</Option>
                      })}
                    </Select>
                )
            default:
                return (<Input placeholder={label} size={inputSize}/>);
        }
    }


    /**
     * [表单控件的初始值]
     * @param  {String} options.type    [description]
     * @param  {[type]} options.options [description]
     * @return {[type]}                 [description]
     */
    createInitValue = (item,formType="add") => {
        let {type='text',name,options} = item;
        let {formVal,currentRow} = this.state;



        switch(type.toLowerCase()){
            case 'rangepicker':
                if(formType == 'search'){
                    let initialCreateTime = [];
                    if({}.hasOwnProperty.call(formVal,name)){
                        if(formVal.createTime[0]) initialCreateTime[0] = moment(formVal.createTime[0]);
                        if(formVal.createTime[1]) initialCreateTime[1] = moment(formVal.createTime[1]);
                    }
                    
                    return (initialCreateTime.length)?initialCreateTime:'';
                }else if(formType == 'add'){
                  return '';
                }else if(formType == 'edit'){
                  return currentRow[name];
                }
            case 'select':
              if(formType == 'search'){
                  return ({}.hasOwnProperty.call(formVal,name))?formVal[name]:options[0].id;
              }else if(formType == 'add'){
                // console.log(options[0].id)
                  return options[0].id;
              }else if(formType == 'edit'){
                  return currentRow[name];
              }
            default:
              if(formType == 'search'){
                return ({}.hasOwnProperty.call(formVal,name))?formVal[name]:'';
              }else if(formType == 'add'){
                return '';
              }else if(formType == 'edit'){
                return currentRow[name];
              }

        }
    }
    
    render(){
        let {columns,formVal,selectedRows,modalVisible,modalType} = this.state;
        let {
          dispatch,
          users:{
            list,
            loading,
            current,
            pageSize,
            total,
            submitStatus,
            isSmallScrean,
            isMiddleScrean
          }
        } = this.props;
        // console.log(this.state);
        let self = this;

        const searchFormProps = {
          slist:userConfig,
          isSmallScrean:isSmallScrean && (document.body.clientWidth<=456),
          createInputComponent:this.createInputComponent,
          createInitValue:this.createInitValue,
          getSearchData(formVal){
              self.setState({
                formVal
              })
              dispatch({type:'users/query',payload:{currPage:1,pageSize,...formVal}});
          },
        }


        
        const tableListProps = {
            isNotLargetScreen:(isMiddleScrean || isSmallScrean),
            list,
            loading,
            columns,
            selectedRows,
            rowKey:record => record.key,
            pagination:{
              current,
              total,
              pageSize,
              onChange(page, pageSize){
                  dispatch({type:'users/query',payload:{currPage:page,pageSize}})
              },
              showQuickJumper:true,
              showSizeChanger:true,
              onShowSizeChange(current, pageSize){

                  if(pageSize!=this.pageSize){
                    dispatch({type:'users/updateStatus',payload:{pageSize}});
                    dispatch({type:'users/query',payload:{currPage:current,pageSize}})
                  }

              }
            },
            
            rowSelection:{
                hideDefaultSelections:true,
                selections:{
                  key:'user-selection',
                },
                onChange:(selectedRowKeys, selectedRows) =>{
                  // this.setState({selectedRows,currentRow:record});
                },
                onSelect:(record, selected, selectedRows) => {

                  let currentRow = {};

                  if(selected){
                    currentRow = record;
                  }else{
                    
                    if(selectedRows.length && selectedRows.length == 1)
                       currentRow = selectedRows[0];
                  }

                  this.setState({
                    selectedRows,
                    currentRow
                  })
                  // console.log(record);

                },
                onSelectAll:(selected, selectedRows, changeRows) => {
                  if(selected)
                    this.setState({selectedRows});
                  else{
                    this.setState({selectedRows:{},currentRow:{}})
                  }
                }
            }
            // expandedRowRender(record){
            //     console.log(record);
            //     return (<p style={{ margin: 0 }}>123</p>)
            // },
        }

        const toolBtnProps = {
          selectedRows,
          onAdd:(e)=>{
              this.setState({
                modalVisible:true,
                modalType:'add'
              })
          },
          onEdit:(e)=>{
              this.setState({
                modalVisible:true,
                modalType:'edit'
              })
          },
          onDelete:(e)=>{
              this.setState({
                modalVisible:true,
                modalType:'delete'
              })
          }
        }

        const modalProps = {
          modalVisible,
          modalType,
          submitStatus,
          selectedRows,
          createInputComponent:this.createInputComponent,
          createInitValue:this.createInitValue,
          list:userConfig,
          hideModalVisible:() => {
            this.setState({
              modalVisible:false
            });

            dispatch({type:'users/updateStatus',payload:{submitStatus:{type:0,ok:false,message:''}}});
          },
          onOk:(data,type) => {
            let action = type;
            let currentRow = {};
            if(type == 'add') action = 'create';
            else if(type == 'edit'){
              action = 'update';
              currentRow = this.state.currentRow;

              data = {id:currentRow.key,...data}

            } 
            // console.log(data)

            dispatch({type:`users/${action}`,payload:data});
          },
        }


        return (
            <div className="contentInner">
                <div className="list-card-body">
                    <div className="searchList">
                        <SearchForm {...searchFormProps}/>
                        <ToolBtn {...toolBtnProps}/>
                        <TableList {...tableListProps}/>
                        {modalVisible?<CreateModal {...modalProps}/>:''}
                    </div>
                </div>
            </div>
        )
    }

}

Users.propTypes = {

}

const mapStateProps = (state)=>{
    let {users,app} = state;
    let {isSmallScrean,isMiddleScrean} = app;
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    
    users = {...users,isSmallScrean,isMiddleScrean};
    // console.log(users)
    return {users}
}

export default connect(mapStateProps)(Users)