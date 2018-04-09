import {Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Form,Input,Tree,Spin,Modal,Alert} from 'antd';
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
// import moment from 'moment';
import CommonListRoute from '../common/commonListRoute';
import {arrayToTree,isEqualObj} from 'utils/commonFunc';
var namespace = 'role';

class SelfModal extends Component{

    constructor(props){
        super(props)
        let {currRules} = this.props;

        this.state = {
             checkedKeys:{checked:currRules||[], halfChecked:[]},
             confirmLoading:false
        }

        this.renderTree = this.renderTree.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    renderTreeNodes(data){
        return data.map((item) => {
          if (item.children) {
            return (
              <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode {...item} />;
        });
    }  

    onExpand(){
        // console.log('onExpand')
    }

    onCheck(hashTable,checkedKeys){
        // console.log()
        var checked = checkedKeys['checked'];

        function searchParent(item,res){

            let parent = hashTable[item].pid;

            if(parent!=0){
                res.push(parent.toString());
                searchParent(parent,res)
            }
        }


        function getParent(checked){

            let res = [];
            var temp = null;

            checked.forEach((item,index) => {
                var group = item.slice(0,2);
                if(index==0){
                    temp = group;
                    searchParent(item,res);
                    return;
                }

                if(temp!=group){
                    temp = group;
                    searchParent(item,res);
                }
            });


            res = [...(new Set(res.concat(checked)))];

            return res;
        }

        checkedKeys['checked'] = getParent(checked);

        this.setState({
            checkedKeys
        });
    }

    onSelect(){
        // console.log('onSelect')
    }

    arr2treeData(arr){
        var hashTable = {};
        var result = [];

        arr.forEach(item => {
            hashTable[item.id] = {key:item.id,title:item.name,pid:item.pid};  
        })

        arr.forEach(item => {
            var parent = hashTable[item.pid];

            if(parent){
                if(parent['children'] == undefined) parent['children'] = [];

                parent['children'].push(hashTable[item.id]);

            }else{

                result.push(hashTable[item.id]);
            }
        })
        
        // self.setState({
        //     hashTable
        // })

        return {result,hashTable};
    }

    handleOk(){
        let {token,currentRow:{id,key},renderModalConfig:{onSubmit}} = this.props;
        let {checkedKeys:{checked}} = this.state;
        // console.log(checked);

        let data = {access:checked,token,role_id:key};

        onSubmit({data});

        var self = this;

        this.setState({
            confirmLoading:true
        })

        var callself = () => {
            let {submitStatus} = self.props;

            if((submitStatus.ok && submitStatus.type == 1)||(submitStatus.type == 2)){

                self.setState({
                  confirmLoading:false
                });
                if(submitStatus.type == 1){
                  self.props.hideModalVisible();
                }
                
                return;
                
            }else{
              setTimeout(callself,1000);
            }
        }

        setTimeout(callself,1000);
    }

    onCancel(){
        this.props.hideModalVisible();
    }

    renderTree(accessList){
        if(accessList.length){

            let accessTree = [];
            // accessTree = arrayToTree(accessList);

            let {result,hashTable} = this.arr2treeData(accessList)
            accessTree = result;
            // console.log(accessTree);

            return <Tree
                checkable
                defaultExpandAll={true}
                checkStrictly={true}
                onExpand={this.onExpand.bind(this)}
                checkedKeys={this.state.checkedKeys}
                onCheck={this.onCheck.bind(this,hashTable)}
                onSelect={this.onSelect.bind(this)}
              >
                {this.renderTreeNodes(accessTree)}
              </Tree>
        }else{
            return (<Spin style={{width:"100%"}}/>)
        }
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
          modalType,
          modalVisible,
          renderModalConfig,
          accessList,
          currRules,
          submitStatus
        } = this.props;


        return (
          <Modal
              confirmLoading={this.state.confirmLoading}
              className={"createModal-"+modalType}
              title={renderModalConfig.name}
              visible={modalVisible}
              onOk={this.handleOk}
              onCancel={this.onCancel}>
              {this.renderTree(accessList)}
              {!!(submitStatus.type)?<Alert {...this.getAlertProps()} showIcon />:''}        
          </Modal>
        )
    }
}

class Role extends CommonListRoute{
    constructor(props){
        super(props,{namespace});
        // this.state['selectedTreeNodes'] = [];
        this.state['checkedKeys'] = []

    }

    renderFuncConfig = () => {
        return {
            status: (text) => <span style={{color:(text == 1)?'green':'red'}}>{(text == 1)? '启用': '禁用'}</span>,
        }
    }
    /*自定义按钮有两种类型
        1、modal 点击后自动打开一个模态框，模态框自定义表单
        2、action 点击后直接和model层进行信息交互    

    */

    renderCustomBtn = () =>{
        return [
          {
            key:'giveAccess',
            name:'授权',
            style:{},
            type:'modal',
            rcForm:false,
            beforeClick:()=>{
               
                if(this.props[namespace].accessList.length == 0){
                    this.props.dispatch({type:'role/getAccess'});
                }
                // console.log();
            },
            render:(params)=>{
               
                let {accessList} = this.props[namespace];
                var currRules = [];

                let {currentRow} = params;

                if(currentRow && Object.keys(currentRow).length){
                    // console.log(currentRow.rules)
                    currentRow.rules.forEach(item => {
                        currRules.push(item.id.toString())
                    })
                }

                var modalProps = {
                    ...params,
                    accessList,
                    currRules,
                }

                return <SelfModal {...modalProps}/>
                
            },
            /**
             * [description]
             * @param  {[type]} currentRow [当前被选中的行的信息]
             * @param  {[type]} data       [提交的数据]
             * @param  {[type]} type       [description]
             * @return {[type]}            [description]
             */
            onSubmit:({data})=>{

                this.props.dispatch({type:'role/setAccess',payload:{data}});
                // console.log(this.props);
                // console.log(this.state);
            }
            
          }
        ]
    }
}

const mapStateProps = (state)=>{
    let {app:{isSmallScrean,isMiddleScrean}} = state;

    return {[namespace]:{...state[namespace],isSmallScrean,isMiddleScrean}}
}

export default connect(mapStateProps)(Role);