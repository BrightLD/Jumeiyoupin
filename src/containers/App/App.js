import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.less';
import Tab from '../../components/Tab/Tab';
import Home from "../Home/Home";
import QuicklyShop from "../Home/QuicklyShop";
import Demo from "../Demo/Demo";
import Cart from "../Cart/Cart";
import Yiqituan from "../Yiqituan/Yiqituan";
import Profile from "../Profile/Profile";
import Details from "../Details/index";
import FeedBack from "../Profile/FeedBack/feedBack";
import Login from "../Profile/Login/Login";
import SignUp from "../Profile/SignUp/SignUp";
import MyOrder from "../Profile/MyOrder/myorder";

import WaitCommit from "../Profile/MyOrder/WaitCommit/index";
import WaitPay from "../Profile/MyOrder/WaitPay/index";
import WaitSend from "../Profile/MyOrder/WaitSend/index";
import WaitConfirm from "../Profile/MyOrder/WaitConfirm/index";
import Pic from '../Details/DetailTab/Pic/Pic';
import Comment from '../Details/DetailTab/Comment/Comment';
import Params from '../Details/DetailTab/Params/Params';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className='app'>
                    <Tab/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/home/quicklyshop' component={QuicklyShop}/>
                    <Route path='/demo' component={Demo}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/yiqituan' component={Yiqituan}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route path='/details/:item_id/:type' component={Details}/>

                    <Route path='/feedBack' component={FeedBack}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>





                    <Route exact path='/myorder' component={MyOrder}/>
                    <Route path='/waitpay' component={WaitPay}/>
                    <Route path='/waitsend' component={WaitSend}/>
                    <Route path='/waitconfirm' component={WaitConfirm}/>
                    <Route path='/waitcommit' component={WaitCommit}/>






                </div>
            </Router>
        )
    }
}
