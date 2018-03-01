import { Component,PureComponent} from 'react';

import { Button, Form, Input ,Icon ,Select } from 'antd';

import Grid from 'components/Grid';
import {isPlainObj} from 'utils/commonFunc';

const { HRow, HCol } = Grid;

const FormItem = Form.Item;



class SearchForm extends PureComponent{

    constructor(props){
        super(props);     

        this.state = {
            collapse:true
        }

        this.collapseList = this.collapseList.bind(this);
    }

    /**
     * [搜索框提交后执行的代码]
     * @param  {[type]} e [触发事件的事件对象]
     * @return {[type]}   [description]
     */
    handleSearch = (e) => {
        const { validateFieldsAndScroll} = this.props.form;
        e.preventDefault();
        // const {form} = this.props;

        validateFieldsAndScroll((err,fieldsVal) => {
            if(err) return;
            
            let newVal = {};

            Object.keys(fieldsVal).forEach((item) => {
                if(fieldsVal[item] == undefined) return;
                let t_item = item.toLowerCase()
                if(t_item == 'createtime'){
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

    /**
     * [collapseList 设置搜索框的折叠状态]
     * @return {[type]} [description]
     */
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

    /**
     * [表单控件的渲染]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    formItemRender = (item) => {
        const { form:{getFieldDecorator},createInputComponent,createInitValue} = this.props;

        let rules = (!!(item.search) && !isPlainObj(item.search))?(!!(item.search.rules)?item.search.rules:''):''

        let inputOptions = { 
            initialValue:createInitValue(item,'search'),
            rules:[rules]
        }

        return getFieldDecorator(item.name,inputOptions)(createInputComponent(item));                    
    }

    /**
     * [简单的渲染搜索框（只渲染前两个搜索框）]
     * @param  {[type]} list [搜索框的数据]
     * @return {[type]}      [description]
     */
    simpleSearchList = (list) => {
        
        list = list.filter(item => (!!(item.search) && item.search.open) );
        list = list.slice(0,2);
        // console.log(list);
        return (
            <Form layout="inline" onSubmit={this.handleSearch}>
                <HRow>
                    {list.map((item,index)=>{
                        // console.log(item)
                        return (<HCol span={4} sm={12} key={index} >
                                    <FormItem hasFeedback label={item.label}>
                                        {this.formItemRender(item)}
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

    /**
     * [完全渲染搜索框]
     * @param  {[type]} list [description]
     * @return {[type]}      [description]
     */
    advancedSearchList = (list) => {
        const { getFieldDecorator,isSmallScrean} = this.props.form;

        list = list.filter(item => (!!(item.search) && item.search.open));
        // console.log(list)
        return (
            <Form layout="inline" onSubmit={this.handleSearch}>
                <HRow>
                    {list.map((item,index)=>{
                        return (
                            <HCol span={4} sm={12} key={index} >
                                <FormItem hasFeedback label={item.label}>
                                    {this.formItemRender(item)}
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

    /**
     * [搜索框正式渲染]
     * @param  {[type]} list [description]
     * @return {[type]}      [description]
     */
    renderSearchList = (list) => { 
        return (this.state.collapse)?this.simpleSearchList(list):this.advancedSearchList(list);
    }

    render(){
        let { slist } = this.props;

        return (
            <div className="searchForm">  
                {this.renderSearchList(slist)}      
            </div>
        )
    }
}

export default Form.create({})(SearchForm);