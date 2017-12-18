import React,{Component} from 'react';
import HeadTitle from "../HeadTitle/headtitle";
import {NavLink} from 'react-router-dom'
import './myorder.less'
export default class MyOrder extends Component{
    render(){
        return (
            <div className="order">
                <HeadTitle title={"我的订单"}/>
                <div className="order-default">
                    <NavLink to="/myorder"><div>全部</div>
                        </NavLink>
                    <NavLink to="/waitpay"><div>代付款</div></NavLink>
                    <NavLink to="/waitsend"><div>代发货</div></NavLink>
                    <NavLink to="/waitconfirm"><div>待收货</div></NavLink>
                    <NavLink to="/waitcommit"><div>待评价</div></NavLink>
                </div>
                <div className="scroll-list">
                    <img src="https://f0.jmstatic.com/static_account/dist/v1.0.31528/buildAssets/images/order-empty.2736d44.png" alt=""/>
                </div>
            </div>
        )
    }
}
