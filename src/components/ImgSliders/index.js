/*
* 图片轮播组件
*
* speed={300} slideImages={['xxxxx','xxxxx']} sliderWidth="20rem" sliderHeight="20rem" sliderBgcolor="grey" sliderDotsWidth=".7rem" sliderDotsHeight=".7rem" sliderDotsBgcolor="#eee" activeColor="#f33484" sliderDotsMarginL=".5rem" DotsType="round"
*
* 支持如下参数对象：SlidersData.
* 字段：
* speed：轮播速度 number
* slideImages: 图片列表 array
*  sliderWidth：轮播图片宽 （写成rem单位）string
*   sliderHeight：轮播图片高         string
*   sliderBgcolor：轮播盒子背景色    string
*  sliderDotsWidth：轮播焦点宽度 string
*   sliderDotsHeight：轮播焦点高度 string
*   sliderDotsBgcolor：轮播焦点背景色 string
*   activeColor：轮播焦点选中颜色 string
*   sliderDotsMarginL:轮播焦点间隔 string
* */


import React, {Component} from 'react';
import ReactSwipe from 'react-swipe';
import './index.less'

export default class ImgSliders extends Component {
    constructor() {
        super();
        this.state = {index: 0}
    }

    handleSliders() {
        let swipeSliders = this.refs.sliders.swipe;
        swipeSliders.nexting = false;
        swipeSliders.preving = false;
        document.documentElement.onwheel = (e) => {
            if (e.deltaY > 0) {
                if (swipeSliders.nexting === true) {
                    return;
                }
                swipeSliders.next();
                swipeSliders.nexting = true;
            } else {
                swipeSliders.prev();
            }
            swipeSliders.nexting = false;
            swipeSliders.preving = false;
        }
    }

    componentDidMount() {
        this.handleSliders();
    }

    render() {
        if(!this.props.SlidersData){
            return;
        }
        let slidersBoxStyle = {
            width: this.props.SlidersData.sliderWidth,
            height: this.props.SlidersData.sliderHeight,
            backgroundColor: this.props.SlidersData.sliderBgcolor
        }, slidersDotsStyle = {
            width: this.props.SlidersData.sliderDotsWidth,
            height: this.props.SlidersData.sliderDotsHeight,
            backgroundColor: this.props.SlidersData.sliderDotsBgcolor,
            marginLeft: this.props.SlidersData.sliderDotsMarginL
        };
        return (
            <div className="sliders_box" style={slidersBoxStyle}>
                <ReactSwipe ref="sliders" swipeOptions={{
                    speed: this.props.SlidersData.speed, continuous: false, callback: (index) => {
                        this.setState({index})
                    }
                }} className="sliders">
                    {
                        this.props.SlidersData.slideImages.length > 0 ? this.props.SlidersData.slideImages.map((item, index) => {
                            return <div className="slider" key={index}>
                                <img
                                    src={item}
                                    alt=""/>
                            </div>
                        }) : null
                    }


                </ReactSwipe>
                <div className="sliders_navs">
                    {

                        this.props.SlidersData.DotsType === 'round' ? this.props.SlidersData.slideImages.length > 0 ? this.props.SlidersData.slideImages.map((item, index) => {
                        return <span className="sliders_nav_round" key={index} style={this.state.index === index ? {
                        ...slidersDotsStyle,
                        backgroundColor: this.props.SlidersData.activeColor
                    } : slidersDotsStyle}>{}</span>
                    }) : null :this.props.SlidersData.DotsType === 'none'?null :<span className="sliders_nav_num"><i>{this.state.index + 1}</i><i>/{this.props.SlidersData.slideImages.length}</i></span>
                    }

                </div>
            </div>
        )
    }
}