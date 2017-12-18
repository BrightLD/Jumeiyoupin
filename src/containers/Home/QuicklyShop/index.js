import React, {Component} from 'react';
import ImgSliders from "../../../components/ImgSliders/index";
import Headers from "../../../components/Headers/index";
import HeaderSelectorPage from "../../../components/HeaderSelectorPage/index";
import HeaderSelector from "../../../components/HomeSelector/index";
import HeaderNav from "../../../components/HeaderNav/index";
import {Link, NavLink} from 'react-router-dom';
import {get, post} from '../../../api/base';
import './index.less';

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            quicklyData: []
        }
    }

    componentDidMount() {
        get('/quickly').then((res) => {
            console.log(res);
            this.setState({quicklyData: res})
        })
    }

    render() {
        return (
            <div>
                <Headers title='极速免税店'/>
                <HeaderSelectorPage/>
                <HeaderSelector/>
                <HeaderNav nav_data={[{nav_title: '首页', nav_link: '/'}, {
                    nav_title: '极速免税店',
                    nav_link: '/home/quicklyshop'
                }, {nav_title: '母婴', nav_link: '/home/baby'}, {nav_title: '轻奢', nav_link: '/home/luxyxy'}, {
                    nav_title: '名品专卖',
                    nav_link: '/home/pop'
                }]} width={'3.85rem'} dropdown={false}/>
                <ImgSliders SlidersData={{
                    speed: 300,
                    slideImages: ['http://mp5.jmstatic.com/mobile/card_material/item_126_2048_838-ipad2048_1511429966.jpeg?imageView2/2/w/640/q/90'],
                    sliderWidth: "100%",
                    DotsType:'none'
                }}/>
                <div className="deals-icon-box">
                    <ul className="deals-icons">
                    {this.state.quicklyData.length > 0 ? this.state.quicklyData[0].map((item,index)=>{
                        return  <li key={index}>
                            <NavLink to={item.icon_href}>
                                <img
                                    src={item.icon_imgSrc}
                                    alt=""/>
                                <div className="deals-text">
                                    {item.icon_text}
                                </div>
                            </NavLink>
                        </li>
                    }):null
                        }
                    </ul>
                </div>
                <div className="deals-content">
                    <div className="deals-content-header">
                        <span className="deals-content-header-icon"><img
                            src="//f0.jmstatic.com/btstatic/h5/common/icon_title.png" alt=""/></span>
                        <span className="deals-content-header-txt">今日团购，每天10点上新</span>
                    </div>
                    {this.state.quicklyData.length>0?<ul className="deals-content-lists">
                        {this.state.quicklyData[1].map((item,index)=>{
                            return <li key={index} className="deals-content-list" data-prouctid={item.quickProduct_id}>
                                <NavLink to=''>
                                    <div className="product-info">
                                        <div className="product-img">
                                            <img
                                                src={item.quickImgSrc}
                                                alt=""/>
                                        </div>
                                        <div className="product-desc">
                                            <div className="product-name">{item.quick_name}</div>
                                            <div className="price-info">
                                            <span className="activity-jumei-price">
                                                <span className="price">
                                                    <span>{item.quick_new_price}</span>
                                                </span>
                                                {item.quick_old_price?<span className="old">{item.quick_old_price}</span>:null}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                        })}
                    </ul>:null}

                </div>
            </div>
        )
    }
}