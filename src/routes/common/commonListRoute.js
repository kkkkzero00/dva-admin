import React,{ Component,PureComponent ,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button, Row, Form, Input, Alert ,Icon ,Modal ,Select ,DatePicker ,InputNumber ,Spin} from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import axios from 'axios';
import {isEqualObj} from 'utils/commonFunc';

import Grid from 'components/Grid';
const { HRow, HCol } = Grid;

import { SearchForm ,TableList ,CreateModal} from 'components/CommonList'
import './index.less';

const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const {Option} = Select;
const confirm = Modal.confirm;


const ToolBtn = ({selectedRows,onBtnHandler,customBtn}) => {
    let selectedRowsLen = selectedRows.length;

    let style = {
        marginRight:10
    }


    function renderCustomBtn(btn){
       if(btn.length){
          return btn.map(item => {
            let render = item.btnRender;
            delete item.btnRender;

            if(item.type == undefined) item.type = 'action';

            let custom = {};

            switch(item.type.toLowerCase()){
              case 'action':
                custom = {
                  ...((item.onClick)?{onClick:item.onClick.bind(this)}:{})
                }
                break;
              case 'modal':
                custom = {
                  ...(((selectedRows.length>1)||(selectedRows.length==0))?({disabled:'disabled'}):{}),
                  ...({onClick:onBtnHandler.bind(this,item.key,item)})
                }
                break;
            }

            return (
              <Button 
                {...custom}        
                key={item.key}
              >
              {item.name}
              </Button>
            );
          })
       }
    }
    
    return (
      <div className="toolBtn">

          <Button type="primary" className="add-btn" onClick={onBtnHandler.bind(this,'add',null)}>新增</Button>
          {(selectedRowsLen>0)?
              <Button type="ghost" 
                      className="edit-btn"
                      key="edit-btn"
                      {...((selectedRowsLen>1)?{disabled:true}:{onClick:onBtnHandler.bind(this,'edit',null)})}>编辑</Button>:''}
          {
            (selectedRowsLen>0)?
              (selectedRowsLen>1)?
              (<Button
                  type="ghost"
                  className="muti-del-btn"
                  key="muti-del-btn"
                  onClick={onBtnHandler.bind(this,'delete',null)}>批量删除</Button>):
              (<Button 
                  type="ghost"
                  className="del-btn"
                  key="del-btn"
                  onClick={onBtnHandler.bind(this,'delete',null)}>删除</Button>):''
          }
          
          {customBtn?renderCustomBtn(customBtn):''}
      </div>
    )
}


class CommonListRoute extends Component {

    state = {
      // expandForm: false,
      selectedRows: [],
      currentRow:null,
      modalVisible:false,//弹出窗显示状态
      modalType:'add',//弹出窗的类型（添加用户，编辑用户）
      formVal: {},
      renderModalConfig:null
    };

    constructor(props,{namespace}){
      super(props);
      this.namespace = namespace;
    } 

    componentWillMount(){
        this.getUsersData();
    }

    componentWillReceiveProps(nextProps){
        let {currentRow} = this.state;


        if(!currentRow) return true;
        // console.log(nextProps[this.name])

        let newCurrRow = nextProps[this.namespace]['list'].filter(item => (item.key == currentRow.key))[0];


        if(!isEqualObj(newCurrRow,currentRow)){
            this.setState({
                currentRow:newCurrRow
            });
        }
    }


    getUsersData(currPage=1,pageSize=10){
        this.props.dispatch({type:`${this.namespace}/query`,payload:{currPage,pageSize}})
    }


    /**
     * [创建初始化表单控件的组件]
     * @param  {String} options.type    [description]
     * @param  {[type]} options.options [description]
     * @return {[type]}                 [description]
     */
    createInputComponent = (item) => {
        let {type='text',label,options} = item;
        let { isSmallScrean } = this.props[this.namespace];
        let inputSize = isSmallScrean?'small':'default';

        type = type.toLowerCase();

        switch(type){
            case 'rangepicker':
                return <RangePicker
                        size={inputSize}
                        style={{width:'auto'}}
                        showTime={true}
                        format="YYYY-MM-DD"
                        placeholder={['开始时间', '结束时间']}/>
            case 'multiselect':
                // return (
                //     <Select size={inputSize} {...((type=='multiselect')?{mode:"multiple"}:null)}>
                //       {Object.keys(options).map((id)=>{
                //         return <Option value={parseInt(id)} key={parseInt(id)}>{options[id]}</Option>
                //       })}
                //     </Select>
                // )
            case 'select':
                return (
                    <Select size={inputSize} {...((type=='multiselect')?{mode:"multiple"}:null)}>
                      {Object.keys(options).map((id)=>{
                        return <Option value={parseInt(id)} key={parseInt(id)}>{options[id]}</Option>
                      })}
                    </Select>
                )
            case 'number':
                return (<InputNumber min={0} max={150}/>)
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
        let {type='text',name} = item;
        let {formVal,currentRow} = this.state;

        type = type.toLowerCase();

        switch(type){
            case 'rangepicker':
                if(formType == 'search'){
                    let initialCreateTime = [];
                    // console.log(name);
                    

                    if(formVal.hasOwnProperty(name) && formVal[name].length!=0){

                        if(formVal[name][0]) initialCreateTime[0] = moment(formVal[name][0]).format();
                        if(formVal[name][1]) initialCreateTime[1] = moment(formVal[name][1]).format();

                        // console.log(initialCreateTime);
                    }else{
                        // let now = (new Date).getTime();
                        // console.log(now);
                        // initialCreateTime[0] = moment(now);
                        // initialCreateTime[1] = moment(now+(86400000));
                        initialCreateTime = [];
                    }

                    return initialCreateTime;

                }else if(formType == 'add'){
                  return [];
                }else if(formType == 'edit'){
                  return currentRow[name];
                }
            
            case 'select':
            case 'multiselect':
              let {options} = item;

              if(formType == 'search'){
                  // console.log(formVal[name]);
                  if(type=='multiselect'){
                    return ({}.hasOwnProperty.call(formVal,name))?formVal[name]:undefined;
                  }

                  return ({}.hasOwnProperty.call(formVal,name))?formVal[name]:null;
              }else if(formType == 'add'){
                  // if(type == 'multiselect') return options[Object.keys(options)[0]];
                  return undefined;
              }else if(formType == 'edit'){
                  if(type=='multiselect'){
                    let keys = Object.keys(currentRow[name]).map(item => parseInt(item));
                    // console.log(keys);
                    return keys
                  }

                  return parseInt(currentRow[name]);
              }
            case 'number':
              if(formType == 'search'){
                  return ({}.hasOwnProperty.call(formVal,name))?parseInt(formVal[name]):null;
              }else if(formType == 'add'){
                // console.log(options[0].id)
                  return ''
              }else if(formType == 'edit'){
                  return parseInt(currentRow[name]);
              }
            default:
              if(formType == 'search'){
                return ({}.hasOwnProperty.call(formVal,name))?formVal[name]:null;
              }else if(formType == 'add'){
                return null;
              }else if(formType == 'edit'){
                return currentRow[name];
              }
        }
    }
    
    render(){
        let namespace = this.namespace;

        let {formVal,selectedRows,currentRow,modalVisible,modalType,renderModalConfig} = this.state;

        let {
          dispatch,
          [namespace]:{
            list,
            columnConfig,
            token,
            loading,
            current,
            pageSize,
            total,
            submitStatus,
            isSmallScrean,
            isMiddleScrean
          }
        } = this.props;


        let columns = [];

        // console.log(this.props[namespace]);

        if(columnConfig.length!=0){
            let showList = columnConfig.filter(item =>{
              return !!(item.render) && !!(item.render.show)
            })

            let renderFuncs = this.renderFuncConfig?this.renderFuncConfig():null;

            showList.forEach(item => {
                // title: '姓名',
                // dataIndex: 'username',
                // key: 'username',
                // render: (text, record) => text,
                let cItem = {
                    title:item.label,
                    dataIndex:item.name,
                    key:item.name,
                }

                if(renderFuncs && renderFuncs.hasOwnProperty(item.name)){
                    cItem.render = renderFuncs[item.name];
                }

                columns.push(cItem);
            })
        }

        let self = this;

        const searchFormProps = {
          slist:columnConfig,
          isSmallScrean:isSmallScrean && (document.body.clientWidth<=456),
          createInputComponent:this.createInputComponent,
          createInitValue:this.createInitValue,
          getSearchData(formVal){
              self.setState({
                formVal
              })
              // console.log(formVal);

              dispatch({type:`${namespace}/query`,payload:{currPage:1,pageSize,...formVal}});
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
                  dispatch({type:`${namespace}/query`,payload:{currPage:page,pageSize,...formVal}})
              },
              showQuickJumper:true,
              showSizeChanger:true,
              onShowSizeChange(current, pageSize){

                  if(pageSize!=this.pageSize){
                    dispatch({type:`${namespace}/updateStatus`,payload:{pageSize}});
                    dispatch({type:`${namespace}/query`,payload:{currPage:current,pageSize}})
                  }

              }
            },
            
            rowSelection:{
                hideDefaultSelections:true,
                selections:{
                  key:`${namespace}-selection`,
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
          customBtn:this.renderCustomBtn?(this.renderCustomBtn()):null,
          onBtnHandler:(modalType,renderModalConfig,e)=>{
          
            let self = this;
            if(renderModalConfig&&renderModalConfig.beforeClick){
              renderModalConfig.beforeClick();
            }
           
            self.setState({
              modalVisible:true,
              modalType:modalType,
              renderModalConfig
            });
          }
        }
        // console.log(currentRow);
        var modalProps = {};

        if(!renderModalConfig){
            modalProps = {
              modalVisible,
              modalType,
              submitStatus,
              selectedRows,
              currentRow,
              token,
              createInputComponent:this.createInputComponent,
              createInitValue:this.createInitValue,
              list:columnConfig,
              hideModalVisible:() => {
                this.setState({
                  modalVisible:false
                });

                dispatch({type:`${namespace}/updateStatus`,payload:{submitStatus:{type:0,ok:false,message:''}}});
              },
              onOk:(data,type) => {
                let action = type;
                let currentRow = {};
                // console.log(data);
                if(type == 'add') action = 'create';
                else if(type == 'edit'){
                  action = 'update';
                  currentRow = this.state.currentRow;
                  // console.log(currentRow);
                  data = {id:currentRow.key,_pk:currentRow.id,...data}
                } 
                // console.log(data);
                dispatch({type:`${namespace}/${action}`,payload:data});
              },
            }
        }else{
          modalProps = {
            currentRow,
            modalVisible,
            modalType,
            renderModalConfig,
            token,
            submitStatus,
            hideModalVisible:() => {
                this.setState({
                  modalVisible:false
                });
            },
          }
        }


        // console.log(renderModalConfig)
        return (
            <div className="contentInner">
                <div className="list-card-body">
                    <div className="searchList">
                        <SearchForm {...searchFormProps}/>
                        <ToolBtn {...toolBtnProps}/>
                        {(columns.length!=0)?<TableList {...tableListProps}/>:<Spin style={{width:"100%",margin:"0 auto",textAlign:'center'}}/>}
                        {modalVisible?(renderModalConfig?renderModalConfig.render(modalProps):<CreateModal {...modalProps}/>):''}
                    </div>
                </div>
            </div>
        )
    }
}

// CommonListRoute.propTypes = {
// }

export default CommonListRoute;