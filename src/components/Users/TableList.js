import { Component,PureComponent,Fragment } from 'react';
import { Button, Form, Input ,Icon ,Table } from 'antd';

const TableList = ({isSmallScrean,...tableProps}) => {

    return (
        <div className="tableList">
            <Table{...tableProps}/>
        </div>
    )
}


export default TableList;