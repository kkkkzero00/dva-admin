import { Component,PureComponent,Fragment } from 'react';
import { Button, Form, Input ,Icon ,Table } from 'antd';

class TableList extends PureComponent {
    constructor(props){
        super(props);
    }


    componentWillMount(){
        this.props.getUsersData();
    }


    render(){
        let {getUsersData,isSmallScrean,...tableProps} = this.props;
        // console.log(list)
        return (
            <div className="TableList">
                <Table
                    {...tableProps}
                    />
            </div>
        )
    }
}


export default TableList;