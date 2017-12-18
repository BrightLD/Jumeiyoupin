import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Tab.less'

export default class Tab extends Component {
    render() {
        return (
            <ul className='footerTab'>
                <NavLink exact to='/' className="home"><span className="iconfont icon-shouye">

                </span>
                    <span>首页</span></NavLink>
                <NavLink to='/yiqituan/recommend' className="yiqituan"><span className="iconfont icon-pintuan">

                </span>
                    <span>拼团</span>
                </NavLink>
                <NavLink to='/cart' className="cart"><span className="iconfont icon-gouwuche"></span>
                    <span>购物车</span>
                </NavLink>
                <NavLink to='/profile' className="profile"><span className="iconfont icon-renwu"></span>
                    <span>个人</span>
                </NavLink>
            </ul>
        )
    }
}