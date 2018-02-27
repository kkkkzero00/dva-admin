import { Component } from 'react';

import { Icon , Spin } from 'antd';

import { connect } from 'dva';

import './carousel.less';

export default class Carousel2 extends Component{


    constructor(props){
        super(props);

        // let {
        //     sliderWidth,sliderLeft,ulWidth,
        //     albums,limit,itemNum,groupNum,
        //     offset,start,end,maxItem,dataGroupNum,
        //     ulClassName
        // } = props;

        let leftIcon = false;
        let rightIcon = true;

        let {albums,itemNum,ulNum} = props;
        let {alumnTree} = this.getAlbumGroup(albums,itemNum);

        // let isLoadingData = [];
        
        // for(let i=0;i<ulNum;i++){
        //     isLoadingData[i] = false;
        // }


        // console.log(isLoadingData)

        this.state = {
            ...props,
            hasLoadedImg:[],
            current:0,
            leftIcon,
            rightIcon,
            alumnTree,
            // isLoadingData,
        }



        this.renderCarousel = this.renderCarousel.bind(this);
        this.handleClick = this.handleClick.bind(this);   
    }

    //Props改变时触发
    componentWillReceiveProps(nextProps){

        let {albums,groupNum,start,end,itemNum} = nextProps;

        let {alumnTree} = this.getAlbumGroup(albums,itemNum);

        // let {isLoadingData} = this.state;

        let direct = 0;

        if(start < this.state.start) direct = 1;

        if(end > this.state.end) direct = 2;


        // isLoadingData = this.setUlLoading(isLoadingData,direct,false,true);

        // console.log(alumnTree)
        this.setState({
            albums,
            groupNum, 
            start,
            end,
            alumnTree,

        })
    }


    shouldComponentUpdate(nextProps, nextState){
        // console.log(nextState)
       // if(nextState.hasLoadedImg.length && nextState.albums.length) return false;
       // console.log(this.state)
       // console.log(nextProps);

       return true;

    }
    
    /**
     * [getAlbumGroup 将数组分块]
     * @param  {[type]} arr [初始数组]
     * @param  {[type]} num [分成多少块一组]
     * @return {[type]}     [description]
     */
    getAlbumGroup(arr,num){
        let alumnTree = [];

        for(var i=0,len=arr.length;i<len;i+=num){
            let group = i+num;
            alumnTree.push((group < len)?arr.slice(i,group):arr.slice(i));
        }

        return {alumnTree};
    }
    
    /**
     * [renderCarousel 渲染组件]
     * @param  {[type]} tree [初始树的结构]
     * @return {[type]}      [description]
     */
    
    /* 
        TODO: 网速过慢轮播无法加载的问题
        isLoadingData[index]?
               (<div style={{opacity:show?1:0,zIndex:show?8:0}} key={index}>
                    <Spin tip="Loading..."/>
                </div>):
     */
    renderCarousel(tree){
        var self = this;
        let {hasLoadedImg,start,limit,current,isLoadingData} = this.state;
        let show = false;
        // console.log(isLoadingData)

        return tree.map((item,index)=>{

            if(current == index){ 
                show = true;
                // console.log(current)
            }else show = false;


            return (          
                <ul 
                    className={self.props.ulClassName}
                    key={index} 
                    style={{width:this.props.ulWidth,opacity:show?1:0,zIndex:show?8:0}}>
                {item.map((item2,index2)=>{
                    // console.log(item2);
                    return (
                        <li key={item2.id}>
                            <div className="u-cover">
                                {hasLoadedImg.filter((picId)=>{return picId == item2.pic})[0]
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
                                        onLoad={self.handleImageLoad.bind(self,item2.pic)}/>
                                    
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

    setUlLoading(arr,direct,num,val,onlyChange=false){
        if(direct == 1){
            if(!onlyChange){
                let a = new Array(num);
                a.fill(val)

                arr = a.concat(arr);
            }else{
                arr.fill(val,0,num);
            }
        }else if(direct == 2){
            if(!onlyChange){
                let a = new Array(num);
                a.fill(val)

                arr = arr.concat(a);
            }else{
                arr.fill(val,-num);
            }
        }

        return arr
    }

    trottle(cb,delay,leastTime){
        var timeout,startTime = new Date();

        return function(){
            var context = this,
                args = arguments,
                currTime = new Date();

            clearTimeout(timeout);

            if(currTime - startTime >= leastTime){
                cb.apply(context,args);
                startTime = currTime;
            }else{
                timeout = setTimeout(cb,delay)
            }
        }
    }

    handleClick(type,e){
        let {current,ulWidth,groupNum,sliderWidth,limit,ulNum,itemNum,end,start,maxItem,dataGroupNum,offset,hasLoadedImg,isLoadingData} =  this.state;
        let curr_left = 0;
        let leftIcon = true;

        // console.log(start);
        // console.log(end);    
       

        // console.log(current);
        // console.log(offset);
        if(type == 1){


            //是否已经到请求的数据列表开头
            //第一个是还没到
            if(((start/limit) > 0)){
                //如果当前页面中的位置已经到了边缘，申请数据，offset是页面上每三个ul组成一组的偏移值
                if(current == 0){
                    //申请数据
                    // console.log(start);
                    this.props.getCarouselItem((start-limit),limit,type);
                    
                    //每个ul加载状态设置
                    // isLoadingData = this.setUlLoading(isLoadingData,type,ulNum,true);
                    
                    if((end + limit) - start > maxItem) {
                        this.setState({
                            hasLoadedImg:hasLoadedImg.slice(0,maxItem)
                        });

                        // isLoadingData = isLoadingData.slice(0,(maxItem/itemNum));

                    }
                    
                    
                    // this.setState({
                    //     isLoadingData
                    // })

                    if(offset!=0) offset -= 1;

                    current = ulNum - 1;
                }else{
                    current -= 1;
                    offset = Math.floor(current/ulNum);
                }

                this.setState({
                    offset
                })

            }else{
                //前面已经没有数据了，禁用左边箭头
                if(current == 0)
                    leftIcon = false;
                else
                    current -= 1;
                
            }
            
        }else if(type == 2){ 
            
            // 当前位置已经到了右边的临界区
            if(current < (groupNum-1)) {
                //每5个向前移
                current += 1;

                //保持 offset和current同步
                if(offset < (dataGroupNum - 1) && current >= ((offset+1)*ulNum)){
                    offset = offset + 1;
                    this.setState({
                        offset, 
                    })
                }
            }else{
               
                // console.log(offset)
                // console.log(dataGroupNum)
                //如果还没到边缘情况,offset是对应每三个ul组成的块的下标
                if(offset < (dataGroupNum - 1)){
                    offset += 1;
                    current =  current + 1;
                }else{
                    current = (offset * ulNum);
                }

                // console.log(123);
                this.props.getCarouselItem(end,limit,type);

                // isLoadingData = this.setUlLoading(isLoadingData,type,ulNum,true);

                if((end + limit)-start > maxItem) {
                        this.setState({
                            hasLoadedImg:hasLoadedImg.slice(limit)
                        });

                        // isLoadingData = isLoadingData.slice(ulNum);
                }

                // console.log(curr_offset)
                this.setState({
                    offset,
                })
            }

            leftIcon = true;
        }
        // console.log(current);
        // console.log(offset);
        // console.log(curr_left);

        this.setState({
            current,
            leftIcon,
        })
    }

    handleImageLoad(pic,e){
     
        this.setState( ({ hasLoadedImg }) => {
          hasLoadedImg.push(pic)
          return { hasLoadedImg:hasLoadedImg}
        })
    }

    

    render(){

        let {
            leftIcon,
            rightIcon,
            alumnTree,
        } = this.state;

        // console.log(isLoadingData)

        return(
            <div className="my-carousel">
                {leftIcon?<Icon type="left" data-type="left" onClick={this.handleClick.bind(this,1)}/>:''}
                <div className="inner-carousel">
                    <div className="inner-slider">
                      {this.renderCarousel(alumnTree)}
                    </div>
                </div>
                {rightIcon?<Icon type="right" data-type="right" onClick={this.handleClick.bind(this,2)}/>:''}
            </div>
        )
    }
    
}
