import { Component,PureComponent ,Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert ,Icon ,Divider } from 'antd';

import Grid from 'components/Grid';
const { HRow, HCol } = Grid;

import { SearchForm ,TableList } from 'components/Users'
import './index.less';

const FormItem = Form.Item;

const Users = ({users,dispatch}) => {

    const {isSmallScrean,list,current,pageSize,total,loading,formVal} = users;

    
    const searchFormProps = {
        isSmallScrean,
        formVal,
        getSearchData(formVal){
            dispatch({type:'users/updateStatus',payload:{formVal}});
            dispatch({type:'users/query',payload:{currPage:1,pageSize,...formVal}})
        },

    }
    const columns = [
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          width: 64,
          render: (text) => <img alt={'avatar'} width={24} src={text} />,
        }, {
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
          dataIndex: 'isMale',
          key: 'isMale',
          render: (text) => <span>{text
                ? '男'
                : '女'}</span>,
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
        }, {
          title: '操作',
          key: 'operation',
          width: 120,
          render: (text, record) => {
            return (
                <div>
                    <a className="delete-btn" href="javascript:;">编辑</a>
                    <Divider type="vertical" />
                    <a className="edit-btn" href="javascript:;">删除</a>
                </div>
            )
          }
        },
    ]


    const tableListProps = {
        isSmallScrean,
        dataSource:list,
        loading,
        columns,
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
        getUsersData(currPage=1,pageSize=10){
            dispatch({type:'users/query',payload:{currPage,pageSize}})
        },
        // expandedRowRender(record){
        //     console.log(record);
        //     return (<p style={{ margin: 0 }}>123</p>)
        // },
        rowSelection:{
            // fixed:true,
            selections:{
              key:'user-selection',
              // onSelect(changeableRowKeys){
              //     console.log('click checkbox')
              // }
            },
            onChange(selectedRowKeys, selectedRows){
              // console.log('onChange')
            },
            onSelect(record, selected, selectedRows){
              // console.log('onSelect')
            },
            onSelectAll(selected, selectedRows, changeRows){
              // console.log('onSelectAll')
            }

        }
    }

    // console.log(users)
    return (
        <div className="contentInner">
            <div className="list-card-body">
                <div className="searchList">
                    <SearchForm {...searchFormProps}/>
                    <div className="add-btn"><Button type="primary">新增</Button></div>
                    <TableList {...tableListProps}/>
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {

}

const mapStateProps = (state)=>{
    let {users,app} = state;
   
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    users = {...users,isSmallScrean:app.isSmallScrean};
    // console.log(users)
    return {users}
}

export default connect(mapStateProps)(Users)