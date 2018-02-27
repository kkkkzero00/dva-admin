import { Component } from 'react';

import { Icon, Spin } from 'antd';

import { connect } from 'dva';

import './carousel.less';

export default class Carousel extends Component{


    constructor(props){
        super(props);

        let {albums,itemNum} = props;


        let {alumnTree} = this.getAlbumGroup(albums,itemNum);

        this.state = {
            ...props,
            alumnTree,
            current:0,
            hasLoadedImg:[],
        }

        this.renderCarousel = this.renderCarousel.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }
    

    getAlbumGroup(arr,num){
        let alumnTree = [];

        for(var i=0,len=arr.length;i<len;i+=num){
            alumnTree.push(arr.slice(i,i+num));
        }

        return {alumnTree};
    }

    handleImageLoad(pic,e){
     
        this.setState( ({ hasLoadedImg }) => {
          hasLoadedImg.push(pic)
          return { hasLoadedImg:hasLoadedImg}
        })
    }

    
    renderCarousel(tree){
        var self = this;
        let {hasLoadedImg,limit} = this.state;

        return tree.map((item,index)=>{
            return (
                <ul className="carousel-ul" key={index} style={{width:this.props.ulWidth}}>
                {item.map((item2,index2)=>{
                    // console.log(item2);
                    return (
                        <li key={item2.id}>
                            <div className="u-cover">
                                {(hasLoadedImg.filter((picId)=>{return picId == item2.pic})[0])
                                    ?''
                                    :(
                                        <div className="img-placeholder"> 
                                            <Spin tip="Loading..."/>
                                        </div>
                                    )
                                }
                                <a href="javascript:;">
                                    <img 
                                        className="carousel-img" 
                                        src={item2.picUrl} 
                                        data-src={item2.picUrl}
                                        onLoad={self.handleImageLoad.bind(self,item2.pic)}
                                    />
                                </a>
                                {item2.name}

                            </div>
                        </li>
                    )
                })}
                </ul>
            )
        })
    }

    handleClick(type,e){
        let {current,sliderStyle,ulWidth,groupNum} =  this.state;
        let left = 0;

        if(type == 1){
           current =  (current == 0) ? (groupNum - 1) : (current - 1);

        }else if(type == 2){
           current = (current == (groupNum - 1)) ? 0 : (current + 1);
        }

        left = -current*ulWidth;
          
        this.setState({
            current,
            sliderLeft:left
        })
    }

    render(){

        let {sliderWidth,sliderLeft,alumnTree} = this.state;

        return(
            <div className="my-carousel">
                <Icon type="left" data-type="left" onClick={this.handleClick.bind(this,1)}/>
                <div className="inner-carousel">
                    <div className="inner-slider" style={{width:sliderWidth,left:sliderLeft}}>
                      {this.renderCarousel(alumnTree)}
                    </div>
                </div>
                <Icon type="right" data-type="right" onClick={this.handleClick.bind(this,2)}/>
            </div>
        )
    }
    
}
