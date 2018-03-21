import {Component,PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Alert,Icon,Spin } from 'antd';
import {SelectBox,Carousel,Carousel2} from 'components/IndexPage';
import {HRow,HCol} from 'components/Grid';
import './indexPage.less';



const FormItem = Form.Item;

//使用了PureComponet的话 如果同一个引用的数据改变再setState的话是不会触发render的
class DeleteItem extends PureComponent {
  state = {
    items: [1, 2, 3]
  }
  handleClick = () => {
    const { items } = this.state;
    items.pop();
    // console.log(items)
    // 因为slice返回了一个新的实例，所以可以进行渲染
    this.setState({ items:items.slice(0) });
  }
  render() {
    console.log(this.state.items)
    return (<div>
      <ul>
        {this.state.items.map(i => <li key={i}>{i}</li>)}
      </ul>
      <button onClick={this.handleClick}>delete</button>
    </div>)
  }
}


const IndexPage = ({indexPage,dispatch}) => {

    let {carousel} = indexPage;

    const selectBoxProps = {

        list:[
            {id:1,name:'lady gaga'},
            {id:2,name:'katy perry'},
            {id:3,name:'rihanna'},
            {id:4,name:'taylor swift'},
            {id:5,name:'adele'}
        ]

    }

    
    // const carouselProps = {
    //   sliderWidth:750*groupNum,//滑块的宽度
    //   sliderLeft:0,//滑块的偏移量
    //   ulWidth:750,//每一个可视元素的宽度
      
    //   albums,//初始数据
    //   limit,//每次请求多少条数据
    //   offset,//请求数据的偏移量,以个数为单位 比如第 offset:50  为从第50条开始取
    //   itemNum,//每组有多少个
    //   groupNum,//有多少组(就是多少个ul)
    //   start,
    //   end,
    //   maxItem,
    //   getCarouselItem(offset=0,limit=30,direct=0){
    //         dispatch({type:'indexPage/getCarouselItem',payload:{offset,limit,direct}});
    //   }, 
    // }

    // console.log(albums.length);
    
    // 

    //0 是滚动轮播
    //1 是渐变轮播
    const getCarouselProps = (carousel,type=0) => {
           
            let ulClassName,c_props;

            let {albums,limit,offset,maxItem,start,end,itemNum} = carousel;
            let groupNum = (albums.length/itemNum);
            
            
            switch(type){
                case 0:
                    ulClassName = "carousel-ul";

                    let sliderWidth = 750*groupNum;//滑块的宽度
                    let sliderLeft = 0//滑块的偏移量
                    
                    c_props = {
                        sliderWidth,
                        sliderLeft,
                        ulWidth:750,
                        albums,
                        itemNum,
                        groupNum,
                        sliderWidth,
                        sliderLeft,
                    }
                    break;
                case 1:
                    ulClassName = "carousel-ul2";
                    let dataGroupNum = (maxItem/limit);
                    let ulNum = (limit/itemNum);
                    c_props = {                   
                          ulWidth:750,//每一个可视元素的宽度            
                          albums,//初始数据
                          limit,//每次请求多少条数据
                          offset,//请求数据的偏移量,以个数为单位 比如第 offset:50  为从第50条开始取
                          ulNum,
                          itemNum,//每组有多少个
                          groupNum,//当前总共有多少组(就是多少个ul)
                          dataGroupNum,//最多请求了多少组数据
                          start,//后台数据开始的位置，请求数据的偏移量,以个数为单位 比如第 offset:50  为从第50条开始取
                          end,//后台数据结束的位置
                          maxItem,//后台数据的最大请求数
                          ulClassName,

                          getCarouselItem(offset=0,limit=30,direct=0){
                                dispatch({type:'indexPage/getCarouselItem',payload:{offset,limit,direct}});
                          }, 
                    }
                    break;
            }

            return c_props;
    }

    const jsonpCallback = (data) => {
        console.log('获得 X 数据:' + data.x);
    }

    const crossDomain = () => {
        dispatch({type:'indexPage/crossDomain'});
        // let script = document.createElement("script");
        // script.src = "http://127.0.0.1:3000?callback=jsonpCallback";
        // document.body.insertBefore(script, document.body.firstChild);
        
    }
    // console.log(carouselProps2);

    // const carouselProps2 = getCarouselProps(carousel,1);

    const carouselProps = getCarouselProps(carousel,0);

    return (
        <div className="indexPage">
          <HRow>
              <div className="row1">
                <div className="revenue"> 
                  Revenue
                </div>

                <div className="product-order"> 
                  Revenue
                </div>

                <div className="tags"> 
                  tags
                </div>
              </div>
          </HRow>

          <HRow>
              <span >inline element</span>
          </HRow>
        </div>
    )
}


/* 
  <SelectBox {...selectBoxProps}/> 

  <Button type="primary" onClick={crossDomain}>跨域测试</Button>

  {carousel.albums.length?<Carousel {...carouselProps}/>: <Spin tip="Loading..."/>}
*/

IndexPage.propTypes = {
    indexPage:PropTypes.object,
    dispatch:PropTypes.func,

}

const mapStateProps = (state)=>{
    let {indexPage,app} = state;
   
    // if(app.hasTriggerLogin){
    //     login.showMessage = true
    // }
    // console.log(state)
    return {indexPage}
}

export default connect(mapStateProps)(IndexPage)