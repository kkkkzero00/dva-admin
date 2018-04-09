import {Component,PureComponent} from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { connect } from 'dva';
import { Button, Row, Col, Form, Input, Alert,Icon,Spin,Card } from 'antd';
import {SelectBox,Carousel,Carousel2} from 'components/IndexPage';
import {HRow,HCol} from 'components/Grid';
import './indexPage.less';



const FormItem = Form.Item;

//使用了PureComponet的话 如果同一个引用的数据改变再setState的话是不会触发render的
// class DeleteItem extends PureComponent {
//   state = {
//     items: [1, 2, 3]
//   }
//   handleClick = () => {
//     const { items } = this.state;
//     items.pop();
//     // console.log(items)
//     // 因为slice返回了一个新的实例，所以可以进行渲染
//     this.setState({ items:items.slice(0) });
//   }
//   render() {
//     console.log(this.state.items)
//     return (<div>
//       <ul>
//         {this.state.items.map(i => <li key={i}>{i}</li>)}
//       </ul>
//       <button onClick={this.handleClick}>delete</button>
//     </div>)
//   }
// }

import styles from './numberCard.less'

function NumberCard ({ icon, color, title, number, countUp }) {
  return (
    <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
        </p>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}



const IndexPage = ({indexPage,dispatch}) => {

    let {numbers} = indexPage;
    // console.log(indexPage)
    // const selectBoxProps = {

    //     list:[
    //         {id:1,name:'lady gaga'},
    //         {id:2,name:'katy perry'},
    //         {id:3,name:'rihanna'},
    //         {id:4,name:'taylor swift'},
    //         {id:5,name:'adele'}
    //     ]

    // }


    const numberCards = numbers.map((item, key) => {
      return <Col key={key} lg={6} md={12}>
              <NumberCard {...item} />
             </Col>
    })

    return (
        <div className="indexPage">
          <Row gutter={24}>
            {numberCards}
          </Row>
        </div>
    )
}



IndexPage.propTypes = {
    indexPage:PropTypes.object,
    dispatch:PropTypes.func,

}

const mapStateProps = (state)=>{
    let {indexPage,app} = state;
   
    return {indexPage}
}

export default connect(mapStateProps)(IndexPage)


/*

   let {carousel} = indexPage;

    const carouselProps = {
      sliderWidth:750*groupNum,//滑块的宽度
      sliderLeft:0,//滑块的偏移量
      ulWidth:750,//每一个可视元素的宽度
      
      albums,//初始数据
      limit,//每次请求多少条数据
      offset,//请求数据的偏移量,以个数为单位 比如第 offset:50  为从第50条开始取
      itemNum,//每组有多少个
      groupNum,//有多少组(就是多少个ul)
      start,
      end,
      maxItem,
      getCarouselItem(offset=0,limit=30,direct=0){
            dispatch({type:'indexPage/getCarouselItem',payload:{offset,limit,direct}});
      }, 
    }

    console.log(albums.length);

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

    const carouselProps = getCarouselProps(carousel,0);
 */

/*
    const jsonpCallback = (data) => {
        console.log('获得 X 数据:' + data.x);
    }

    const crossDomain = () => {
        dispatch({type:'indexPage/crossDomain'});
        // let script = document.createElement("script");
        // script.src = "http://127.0.0.1:3000?callback=jsonpCallback";
        // document.body.insertBefore(script, document.body.firstChild); 
    }
 */
/* 
  <SelectBox {...selectBoxProps}/> 

  <Button type="primary" onClick={crossDomain}>跨域测试</Button>

  {carousel.albums.length?<Carousel {...carouselProps}/>: <Spin tip="Loading..."/>}
*/