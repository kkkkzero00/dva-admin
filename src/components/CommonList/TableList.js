import { Component,PureComponent,Fragment } from 'react';
import { Button, Form, Input ,Icon ,Table } from 'antd';
import classnames from 'classnames';
import './tableList.less';

const TableList = ({isNotLargetScreen,columns,list,selectedRows,...tableProps}) => {

    

    let newColumns = columns;

    if(isNotLargetScreen){
      newColumns = columns.slice(0,4);
    }

 

    const expandedRowRender = (record) => {
        let restColumns = columns.slice(4);
       // console.log(record)
        
        return <ul className="dtr-expended-ul">
                {restColumns.map(item => {
                    return (
                        <li key={item.dataIndex}>
                            <span className="dtr-title">{item.title}：</span>
                            
                            <span className="dtr-data">
                                {!!(item.render)?item.render(record[item.dataIndex]):record[item.dataIndex]}
                            </span>
                        </li>
                    )
                })}
                </ul>
        
    }

    let expanded = {

    };

    // if(isSmallScrean && selectedRows.length>0){
    //     let expandedRows = [];

    //     selectedRows.forEach((item,index) => {
    //         expandedRows[index] = item.key;
    //     });
    //     expanded['expandedRowKeys'] = expandedRows;

    // }else if(selectedRows.length == 0){
    //     // expanded['expandedRowKeys'] = [];
    // }

    return (
        <div className={classnames({
                "tableList":true,
                "smallScreanTable":isNotLargetScreen
            })}>
            <Table

                {...tableProps}
                expandedRowRender={isNotLargetScreen?expandedRowRender:null}
                {...expanded}
                columns={newColumns}
                dataSource={list}
            />
        </div>
    )
}


export default TableList;