import {Component} from 'react';

import {Icon} from 'antd';

export default class SelectBox extends Component{
    constructor(props){
        super(props)

        let list = [];

        /*1代表元素在左，2代表元素在右*/
        this.props.list.forEach((value,index)=>{
            list[index]= value;
            list[index]['position'] = 1;
        })



        
        this.state = {
            list
        }


        // this.handleClick = this.handleClick.bind(this);
        // console.log(this.state)
    }

    handleClick(id,type,e){
      
       let list = this.state.list;
       let setnum = 0;


       if(type == 'add'){
            setnum = 2;
       }else{
            setnum = 1;
       }

       list.forEach((item,index)=>{
            if(item.id == id) item.position = setnum;
       })
    
       this.setState({
            list
       })
    }

    render(){
        console.log(this.state.list)
        return(
            <div className="selectBox">
                <div className="left-selectBox">
                    <ul>
                        {this.state.list.map((item,index)=>{
                            if(item.position == 1)
                                return(
                                    <div className="searchboxItem" key={item.id}>
                                        <li data-sid={item.id}>
                                            <Icon type="plus"  onClick={this.handleClick.bind(this,item.id,'add')}/>
                                            {item.name}
                                        </li>
                                    </div>
                                )
                            else if(item.position == 2){
                                return(
                                    <div className="searchboxItem disable-item" key={item.id}>
                                        <li data-sid={item.id}>
                                            <Icon type="plus"/>
                                            {item.name}
                                        </li>
                                    </div>
                                )
                            }
                        })}
                    </ul>
                </div>

                <div className="right-selectBox">
                    <ul>
                       {
                        this.state.list.map((item,index)=>{
                            if(item.position == 2)
                                return(
                                    <div className="searchboxItem" key={item.id}>
                                        <li data-sid={item.id}>
                                            <Icon type="minus"  onClick={this.handleClick.bind(this,item.id,'del')}/>
                                            {item.name}
                                        </li>
                                    </div>
                                )
                        })
                       }
                    </ul>
                </div>
            </div>
        )
    }
}
