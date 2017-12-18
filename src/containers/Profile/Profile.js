import React,{Component} from 'react';
import {HashRouter as Router, Route,Link,} from 'react-router-dom';
import './profile.less'
import HeadTitle from "./HeadTitle/headtitle";
export default class Profile extends Component{
    constructor(){
        super();
    }
    quit=()=>{
        confirm("你确定要退出登录吗？");
       localStorage.clear();
       window.location.reload();
    };
    render(){
        return (
            <div className="profile">
                <HeadTitle title={"我的聚美"} />
                <div className="wrapper">
                    {!localStorage.getItem("userInfo")?<div className="user-unlogin">
                        <div className="userImg">
                        </div>
                        <div className="operation">
                            <div className="operationItem">
                                <Link to="signup" className="signUp">注册</Link>
                                <span>|</span>
                                <Link to="login" className="login">登录</Link>
                            </div>
                        </div>
                    </div>:<div className="user-login">
                        <div className="user-info">
                            <img src="http://f0.jmstatic.com/static_account/dist/20160913/images/user_avatar/0/200_200.png?1511329711" alt=""/>
                            <div className="user-detail">
                                <span>{JSON.parse(localStorage.getItem("userInfo")).tel}</span>
                                <span>钻石会员</span>
                            </div>
                        </div>
                        <div className="user-icon">
                            <div className="icon-content">
                                <Link to="mywish"><i className="iconfont icon-xinyuandan "/></Link>
                                <span>心愿单</span>
                            </div>
                            <div className="icon-content">
                                <Link to="onsale"><i className="iconfont icon-countDown "/></Link>
                                <span>开售提醒</span>
                            </div>
                            <div className="icon-content">
                                <Link to="save"><i className="iconfont icon-shoucang "/></Link>
                                <span>收藏</span>
                            </div>
                        </div>
                    </div>}
                    <div className="fill"/>
                    <div className="order-block">
                        <div className="block-title">
                            <i className="iconfont icon-dingdan ghBook"/>
                            <span>我的订单</span>
                            <Link to="/myorder">查看全部订单
                                <i className="iconfont icon-jiantou ghArrow "/>
                            </Link>
                        </div>
                    </div>
                    <div className="block-content">
                        <a href="" className="block-item">
                            <i className="iconfont icon-daifukuan"/>
                            <span>代付款</span>
                        </a>
                        <a href="" className="block-item">
                            <i className="iconfont icon-daishouhuo"/>
                            <span>代收货</span>
                        </a>
                        <a href="" className="block-item">
                            <i className="iconfont icon-daipingjia"/>
                            <span>待评价</span>
                        </a>
                        <a href="" className="block-item">
                            <i className="iconfont icon-refund"/>
                            <span>退货/退款</span>
                        </a>
                    </div>
                    <div className="fill"/>
                    <div className="block-fond">
                        <div className="font-title">
                            <i className="iconfont icon-wodezichan "/>
                            <span>我的资产</span>
                        </div>
                        <div className="fond-content">
                            <a href="">
                                <span>现金券</span>
                            </a>
                            <a href="">
                                <span>红包</span>
                            </a>
                            <a href="">
                                <span>聚美余额</span>
                            </a>
                            <a href="">
                                <span>礼品卡</span>
                            </a>
                        </div>
                    </div>
                    <div className="fill"/>
                    <div className="block-list">
                        <ul>
                            <li>
                                <i className="iconfont icon-shouhoufuwu"/>
                                <span>售后服务</span>
                                <i className="iconfont icon-jiantou rightArrow"/>
                            </li>
                            <Link to="/feedBack">
                                <li>
                                    <i className="iconfont icon-yijianfankui "/>
                                    <span>意见反馈</span>
                                    <i className="iconfont icon-jiantou  rightArrow"/>
                                </li>
                            </Link>
                            <li>
                                <i className="iconfont icon-shouhuodizhi"/>
                                <span>收货地址</span>
                                <i className="iconfont icon-jiantou
                            rightArrow"/>
                            </li>
                            <li onClick={this.quit}>
                                <i className="iconfont icon-tuichudenglu"/>
                                <span >退出登录</span>
                                <i className="iconfont icon-jiantou rightArrow"/>
                            </li>
                            <li className="cancel">
                                <i className="iconfont icon-rexiandianhua"/>
                                <span>400-123-8888</span>
                                <i className="iconfont icon-jiantou rightArrow"/>
                            </li>
                        </ul>
                    </div>
                    <div className="hint">
                        活动期间24小时服务热线400-123-8888（免长途费)<br/>
                        拨打前请记录您的UID 0
                    </div>
                </div>
            </div>

        )
    }
}
