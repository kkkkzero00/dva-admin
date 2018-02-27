import { Component,PureComponent} from 'react';

import { Button, Form, Input ,Icon ,DatePicker  } from 'antd';

import Grid from 'components/Grid';
const { HRow, HCol } = Grid;

const FormItem = Form.Item;
const  {RangePicker} = DatePicker;
import moment from 'moment';

class SearchForm extends PureComponent{

    constructor(props){
        super(props);

        let {getSearchData,isSmallScrean} = props;
        
        let slist = [
            {
                name:'name',
                label:'姓名'
            },
            {
                name:'createTime',
                label:'创建时间',
                type:'RangePicker'
            },
            {
                name:'age',
                label:'年龄'
            },
            {
                name:'gender',
                label:'性别',
                type:'status'
            },
            {
                name:'phone',
                label:'电话'
            },
            {
                name:'address',
                label:'地址',
                type:'address'
            },
        ];

        this.state = {
            slist,
            isSmallScrean,
            collapse:true
        }

        this.collapseList = this.collapseList.bind(this);
    }


    handleSearch = (e) => {
        const { validateFieldsAndScroll} = this.props.form;
        e.preventDefault();
        // const {form} = this.props;

        validateFieldsAndScroll((err,fieldsVal) => {
            if(err) return;
            
            let newVal = {};

            Object.keys(fieldsVal).forEach((item) => {
                if(fieldsVal[item] == undefined) return;

                if(item.toLowerCase() == 'createtime'){
                    newVal[item] = [];
                    fieldsVal[item].forEach(dateTime => {
                        let format = dateTime.format('YYYY-MM-DD');
                        newVal[item].push(format)
                    })
                }else{
                    newVal[item] = fieldsVal[item];
                }         
            })

            this.props.getSearchData(newVal);

        })
    }

    collapseList(){
        let {collapse} = this.state;

        let newCollapse = !collapse;

        this.setState({
            collapse:newCollapse
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isSmallScrean != this.state.isSmallScrean){
            this.setState({
                isSmallScrean:nextProps.isSmallScrean
            })
        }
    }

    checkInputType = (item) => {
        const { form:{getFieldDecorator},formVal } = this.props;

        let initialCreateTime = [];
        
        // console.log(formVal)

        if({}.hasOwnProperty.call(formVal,'createTime')){
            if(formVal.createTime[0]) initialCreateTime[0] = moment(formVal.createTime[0]);
            if(formVal.createTime[1]) initialCreateTime[1] = moment(formVal.createTime[1]);
        }

        if(item.type == null){
            return getFieldDecorator(item.name,{
                    rules:[
                        {
                        }
                    ]
                })(<Input placeholder={item.label}/>) 
        }

        switch(item.type.toLowerCase()){
            case 'rangepicker':
                return getFieldDecorator(item.name,{ initialValue: initialCreateTime },{
                    rules:[
                        {
                            type:'array',
                            message:'please select time'
                        }
                    ]
                })(<RangePicker
                        style={{width:'auto'}}
                        format="YYYY-MM-DD"
                        placeholder={['开始时间', '结束时间']}/>)
            break;
            default:
                return getFieldDecorator(item.name,{
                    rules:[
                        {
                        }
                    ]
                })(<Input placeholder={item.label}/>)
                         
        }
    }


    simpleSearchList = (list) => {
        list = list.slice(0,2);

        return (
            <Form layout="inline" onSubmit={this.handleSearch}>
                <HRow>
                    {list.map((item,index)=>{
                        // console.log(item)
                        return (<HCol span={4} sm={12} key={index} >
                                    <FormItem hasFeedback label={item.label}>
                                        {this.checkInputType(item)}
                                    </FormItem>
                                </HCol>)
                        
                    })}
                    <HCol span={4} sm={12} key="searchButton" >
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                           {/* <Button style={{ marginLeft: 8 }} >重置</Button>*/}
                            <a style={{ marginLeft: 8 }} onClick={this.collapseList}>
                              展开 <Icon type="down" />
                            </a>
                          </span>
                        </div>
                    </HCol>
                </HRow>
                
            </Form>
        )
    }

    advancedSearchList = (list) => {
        const { getFieldDecorator } = this.props.form;
        let {isSmallScrean} = this.state;
        
        return (
            <Form layout="inline" onSubmit={this.handleSearch}>
                <HRow>
                    {list.map((item,index)=>{
                        return (
                            <HCol span={4} sm={12} key={index} >
                                <FormItem hasFeedback label={item.label}>
                                    {this.checkInputType(item)}
                                </FormItem>
                            </HCol>)
                    })}
                </HRow>
                <div style={{ overflow: 'hidden'}}>
                  <span style={{float:(isSmallScrean?"none":"right") ,transition:"all .3s ease-in-out"}}>
                    <Button type="primary" htmlType="submit">查询</Button>
                   {/* <Button style={{ marginLeft: 8 }} >重置</Button>*/}
                    <a style={{ marginLeft: 8 }} onClick={this.collapseList}>
                      收起 <Icon type="up" />
                    </a>
                  </span>
                </div>
            </Form>
        )
    }

    renderSearchList = (list) => { 
        return (this.state.collapse)?this.simpleSearchList(list):this.advancedSearchList(list);
    }


    render(){
        let { slist } = this.state;

        return (
            <div className="searchForm">  
                {this.renderSearchList(slist)}      
            </div>
        )
    }
}

export default Form.create({})(SearchForm);