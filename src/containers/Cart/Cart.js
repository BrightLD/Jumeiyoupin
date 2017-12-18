import React, {Component} from 'react';
import './Cart.less';
import Test from './images/test.jpg'
import Pre from './images/per.png'
import Shou from './images/首页.png'
import Time from './images/时钟.png'
import {connect} from 'react-redux';
import actions from '../../store/actions/index';
import CartDemo from "./CartDemo";
import GoodsDemo from "./GoodsDemo/GoodsDemo";

class Cart extends Component {
    constructor() {
        super();
        this.state = {seconds: 9, minute: 2, count: 2, list: [], isAllSel: false}
    }

    componentDidMount() {
        let siv = setInterval(() => {
            this.setState({
                seconds: this.state.seconds - 1,
            })
            if (this.state.seconds == 0) {
                let stv = setTimeout(() => {
                    this.setState({
                        minute: this.state.minute - 1,
                        seconds: 9
                    })
                })

                if (this.state.seconds == 0 && this.state.minute == 0) {
                    clearInterval(siv);
                    clearTimeout(stv)
                }
            }


        }, 1000);
        if(this.props.cart.list.length){
            localStorage.setItem('cartList', JSON.stringify(this.props.cart.list))
        }else{
            if(localStorage.getItem('cartList')&&localStorage.getItem('cartList').length>6){
                this.props.modCart(JSON.parse(localStorage.getItem('cartList')))
            }
        }


        /*fetch('http://localhost:3000/api/cartList').then((res) => {
            console.log(res);
        })*/


    };

    handleClick = () => {
        let oFifth = document.getElementsByClassName('fifth')[0];
        let oEdit = document.getElementsByClassName('edit')[0];
        let oModify = document.getElementsByClassName('modify')[0];
        let oDescribe = document.getElementsByClassName('describe')[0];
        let oCount = document.getElementsByClassName('Count')[0];
        oEdit.style.display = 'none';
        oModify.style.display = 'block';
        oDescribe.style.display = 'none';
        oCount.style.display = 'block';
    }

    mouseClick() {
        let oFifth = document.getElementsByClassName('fifth')[0];
        let oEdit = document.getElementsByClassName('edit')[0];
        let oModify = document.getElementsByClassName('modify')[0];
        let oDescribe = document.getElementsByClassName('describe')[0];
        let oCount = document.getElementsByClassName('Count')[0];
        oEdit.style.display = 'block';
        oModify.style.display = 'none';
        oDescribe.style.display = 'block';
        oCount.style.display = 'none';
    }

    reduceClick() {
        let oCount = document.getElementsByClassName('count')[0];
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1,
            })

        }

    }

    plusClick() {
        let oPrompt = document.getElementsByClassName('prompt')[0];
        if (this.state.count < 10) {
            this.setState({
                count: this.state.count + 1,
            })
        }
        if (this.state.count === 10) {
            oPrompt.style.display = 'block';
            let pro = setInterval(() => {
                oPrompt.style.display = 'none';
                clearInterval(pro)
            }, 2000)
        }

    }

    choiceClick() {
        let oChoice = document.getElementsByClassName('choice')[0];
        // oChoice.style.

    }

    localSelection() {
        let oLocalSelection = document.getElementsByClassName('Local-selection')[1];
        let oCommodityBottom = document.getElementsByClassName('commodity-bottom')[1];
        let oChoice = document.getElementsByClassName('choice')[1];

        if (oCommodityBottom.style.display == 'block') {
            oCommodityBottom.style.display = 'none';
            oLocalSelection.style.backgroundColor = '#ffffff';
            oChoice.style.backgroundColor = '#ffffff';
            oLocalSelection.style.border = '1px solid #999999';
            oChoice.style.border = '1px solid #999999';

            return
        } else {
            oCommodityBottom.style.display = 'block';
            oLocalSelection.style.backgroundColor = '#fe4070';
            oChoice.style.backgroundColor = '#fe4070';
            oLocalSelection.style.border = '1px solid #fe4070';
            oChoice.style.border = '1px solid #fe4070';
            return
        }
    }

    handleSelector(e) {
        let cartLists = this.refs.cartLists;
        let n = 0;
        let t = 0;
        let choiceLists = cartLists.getElementsByClassName('choice');
        let LocalSelection = cartLists.getElementsByClassName('Local-selection')[0];


        if (e.target.className !== 'Local-selection') {
            if (e.target.className == 'choice selector') {
                e.target.classList.remove('selector');
            } else if (e.target.className == 'choice') {
                e.target.classList.add('selector');
            }
            for (let i = 0; i < choiceLists.length; i++) {
                let items = choiceLists[i];
                if (items.className == 'choice') {
                    n++;
                    continue
                }
            }
            if (n > 0) {
                LocalSelection.classList.remove('selector');
                n = 0;
            } else {
                LocalSelection.classList.add('selector');
            }

        }
        if (e.target.className == 'local-selection') {
            if (e.target.classname == 'Local-selection selector') {
                e.target.classList.remove('selector');
                let y = [];
                y.push(choiceLists);
            } else {
                e.target.classList.add('selector');
            }
        }


        // for (let i = 0; i < choiceLists.length; i++) {
        //     console.log(9);
        //     let item = choiceLists[i];
        //    if(){
        //        item.classList.remove('selector');
        //        console.log(1);
        //    }else if(){
        //        item.classList.add('selector');
        //        console.log(2);
        //    }
        // }

        // }
    }

    add = (id,style) => {
        let cartList = JSON.parse(localStorage.getItem('cartList'));
        cartList = cartList.map(item => {
            if (item.id == id&& item.style==style) {
                item.count += 1;
            }
            return item;
        });
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.props.modCart(cartList);
    }
    del = (id,style) => {
        let cartList = JSON.parse(localStorage.getItem('cartList'));
        cartList = cartList.filter(item => {
            console.log(style, id);
            return !(item.id == id&& item.style==style)
        });
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.props.modCart(cartList);
    }
    sub = (id,style) => {
        let cartList = JSON.parse(localStorage.getItem('cartList'));
        cartList = cartList.map(item => {
            if (item.id == id && item.style==style) {
                item.count -= 1;
            }
            return item
        });
        cartList = cartList.filter(item => item.count > 0);
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.props.modCart(cartList);
    }
    changeSel = (id,style) => {
        let cartList = JSON.parse(localStorage.getItem('cartList'));
        cartList = cartList.map(item => {
            if (item.id == id&& item.style==style) {
                item.isSel = !item.isSel;
            }
            return item;
        });
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.props.modCart(cartList);
    }
    allSel = () => {

        let cartList = JSON.parse(localStorage.getItem('cartList'));
        if(!cartList.length){

            return;
        }
        cartList = cartList.every(item => item.isSel) ? cartList.map(item => {item.isSel = false;return item}) : cartList.map(item => {item.isSel = true;return item;})
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.props.modCart(cartList);
    }

    render() {

        return (
            <div className='cart-detail'>
                <div className="header">
                    <div className="head-back-box" onClick={()=>{
                        this.props.history.goBack();
                    }}>
                        <img src={Pre} alt=""/>
                    </div>
                    <div className="head-Title">购物车</div>
                    <a href="" className="Home">
                        <img src={Shou} alt=""/>
                    </a>
                </div>
                {this.props.cart.list.length?<div className="time">
                    <a href="" className="timeNew">
                    <img src={Time} alt=""/>
                    </a>
                    <div
                    className="timer-text">{this.state.minute < 10 ? '0' + this.state.minute : this.state.minute}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</div>
                    <div className="clock-msg">结算时间结束后，商品可能被抢空，请尽快结算</div>
                    </div>:null}

                {/*<div className="commodity1">
                    <ul onClick={this.handleSelector.bind(this)} className="cartLists" ref="cartLists">
                        <div className="commodity-top">
                            <div className="Local-selection">

                            </div>
                            <div className="group-title">第三方国际发货</div>
                        </div>
                        <li>
                            <div className="commodity-content">
                                <div className="choice">

                                </div>
                                <div className="box-content">
                                    <img src={Test} alt=""/>
                                    <span>COACH 蔻驰 红色女士手提包红色女士手提包</span>
                                    <div className="describe">
                                        <span className="two">粉红配红色 33*13*23cm</span>
                                        <span className="third">x1</span>
                                    </div>

                                    <div className="Count">
                                        <span className="reduce" onClick={() => this.reduceClick()}>-</span>
                                        <span className="count">{this.state.count}</span>
                                        <span className="plus" onClick={() => this.plusClick()}>+</span>
                                    </div>
                                    <span className="four">¥1399</span>
                                    <span className="fifth">
                                <div className="edit" onClick={() => this.handleClick()}><p>编辑</p></div>
                                <div className="modify">
                                 <p>删除</p>
                                    <p className="line">|</p>
                                    <p onClick={() => this.mouseClick()}>完成</p>

                                </div>

                            </span>
                                </div>
                                <div className="prompt"><p>一次最多只能购买十件，您可以结束完之后再购买</p></div>


                            </div>
                        </li>


                    </ul>


                </div>*/}
                <div className="commodity1">
                    {this.props.cart.list.length?null:<img className="bg" src="https://f0.jmstatic.com/static_account/dist/v1.0.31528/buildAssets/images/order-empty.2736d44.png" alt=""/>}
                    <ul className="cartLists" ref="cartLists">

                        {
                            this.props.cart.list.length ? this.props.cart.list.map((item, index) => {
                                return <GoodsDemo item={item} key={index} add={this.add} del={this.del} sub={this.sub}
                                                  changeSel={this.changeSel}/>
                            }) : null
                        }

                    </ul>


                </div>

                {
                    this.props.cart.list.length? <div className="footer">
                        <div
                            className={localStorage.getItem('cartList') && JSON.parse(localStorage.getItem('cartList')).length && JSON.parse(localStorage.getItem('cartList')).every(item => item.isSel) ? "choice-all sel" : "choice-all"}
                            onClick={() => {
                                this.allSel()
                            }}>
                        </div>
                        <span className="select">全选</span>
                        <span className="total">合计</span>
                        <span className="money">{this.props.cart.list.length ? this.props.cart.list.reduce((prev, next) => {
                            return next.isSel ? prev + parseInt(next.count) * parseFloat(next.price.slice(1)) : prev
                        }, 0).toFixed(2) : 0}</span>
                        <div className="settlement">去结算({this.props.cart.list.length?this.props.cart.list.reduce((prev,next)=>{return next.isSel?prev+parseInt(next.count):prev},0):0})</div>
                    </div>:null
                }
            </div>
        )
    }
}

export default connect(state => state, actions)(Cart);