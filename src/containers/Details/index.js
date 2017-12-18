import React, {Component} from 'react';
import './index.less'
import {Link, Route} from 'react-router-dom'
import gitGrou from '../../api/tuan';
import DetailTab from "./DetailTab/DetailTab";
import Pic from '../Details/DetailTab/Pic/Pic';
import Comment from '../Details/DetailTab/Comment/Comment';
import Params from '../Details/DetailTab/Params/Params';
import HeaderNav from "../../components/HeaderNav/index";
import {get} from '../../api/base';
import {connect} from 'react-redux';
import actions from '../../store/actions/index'
import AddGoodsAnimation from "../../components/AddGoodsAnimation/AddGoodsAnimation";

class Details extends Component {
    constructor() {
        super();
        this.state = {
            date: '00:00:00',
            data: {},
            isSingle: true,
            style: '',
            isShowAni: true,
            temp: {}
        }
    }

    fn = () => {

        this.setState({isSingle: !this.state.isSingle})
    };


    componentDidMount() {
        get(`/getstaticdetail?item_id=${this.props.match.params.item_id}&type=${this.props.match.params.type}`).then(res => {
            /*this.setState({
                list: [...res.data.list]

            })*/
            this.setState({data: res.data})
            console.log(this.state.data);
        })

        let data = new Date();
        let target = data.getTime() + 13 * 60 * 60 * 1000;
        setInterval(() => {
            let time = new Date().getTime();
            let leaveTime = target - time;
            let second = parseInt(leaveTime / 1000 % 60)
            let minute = parseInt(leaveTime / 1000 / 60 % 60);
            let hour = parseInt(leaveTime / 1000 / 60 / 60);
            this.setState({date: hour + ':' + minute + ':' + second})
        }, 1000)
    }

    add = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({isShowAni: true});
        setTimeout(() => {
            this.setState({isShowAni: false}), 1000
        });
        let goods = {
            id: this.props.match.params.item_id,
            price: this.state.data.group_jumei_price,
            title: JSON.parse(localStorage.getItem('goodsInfo')).item.medium_name,
            initPrice: this.state.data.group_single_price,
            style: localStorage.getItem('style'),
            isSel: false,
            count: 1,
            image: JSON.parse(localStorage.getItem('goodsInfo')).item.image
        }
        this.props.addCart(goods);
        this.props.history.push('/cart');

    }
    change = (e) => {
        if (e.target.tagName == 'SPAN') {
            let siblings = e.target.parentElement.children;
            for (var i = 0; i < siblings.length; i++) {
                var obj = siblings[i];
                obj.className = obj.className.replace(/active/, '');
            }
            e.target.className = e.target.className + ' active';
            this.setState({style: e.target.dataset.info});
            localStorage.setItem('style', e.target.dataset.info);
            console.log(e.target.dataset.info);
            console.log(e.target.dataset);
        }
    };

    render() {
        console.log(this.props.location);
        let rowStyle = {
            background: ' #fe4070',
            color: '#fff'

        };
        let goodsInfo = this.props.location.state;
        if (goodsInfo) {
            localStorage.setItem('goodsInfo', JSON.stringify(goodsInfo));
        } else {
            goodsInfo = JSON.parse(localStorage.getItem('goodsInfo'));
        }
        return (
            <div className="details-items">

                {/*第一段*/}
                <div className="goods-box">
                    <div className="goods-img">
                        <img className="imgesone"
                             src={goodsInfo.item.image}/>
                    </div>
                    <div className="goods-msg">
                        <div className="tuan-price">
                            <span className="text-one">{this.state.data.group_jumei_price}</span>
                            <span className="text-two">包邮</span>
                            <span className="del-price">{this.state.data.group_single_price}</span>
                            <p className="tuan_number">{this.state.data.buyer_number_text}</p>
                        </div>
                        <div className="price-details">
                            <p>{this.state.data.group_market_price}</p>
                        </div>
                        <div className="goods-date">
                            <div className="date-one">还剩两天{this.state.date}</div>
                            <span className="date-two">逾期未成团自动退款</span>
                        </div>
                    </div>
                </div>
                {/*第2段*/}
                <div className="article">
                    <p>
                        <span className="article-one">{goodsInfo.item.group_tag_name}</span>
                        <span className="sleect">
{this.state.data.buy_alone ? this.state.data.buy_alone.name : JSON.parse(localStorage.getItem('goodsInfo')).item.medium_name}
                        </span>

                    </p>
                </div>
                {/*第3段*/}
                <div className="choice-model">
                    <h3 className="course-title">选择型号</h3>
                    <div className="model-list" ref={ref => this.ref = ref} onClick={this.change}>
                        {this.state.data.size ? this.state.data.size.map((item, index) => {
                            return index == 0 ? <span className="data-sku active one" key={index}
                                                      data-info={item.size}>{item.size}</span> :
                                <span className="data-sku two" key={index} data-info={item.size}>{item.size}</span>
                        }) : null}


                    </div>

                </div>
                <DetailTab item_id={this.props.match.params.item_id} type={this.props.match.params.type}
                           goodsInfo={goodsInfo}/>
                <Route exact path='/details/:item_id/:type/' component={Pic}/>
                <Route path='/details/:item_id/:type/params' component={Params}/>
                <Route path='/details/:item_id/:type/comment' component={Comment}/>
                {/*第4段*/}
                <div className="btnWrap">
                    <div className="prompt-con">
                        <Link to='/yiqituan/recommend' className="prompt-index">&lt;首页</Link>
                    </div>
                    <Link to="/login" className=" prompt " style={this.state.isSingle ? rowStyle : null}
                          onClick={this.fn}>

                        <p>{this.state.data.group_jumei_price}</p>
                        <p onClick={this.add}>包团开邮</p>
                    </Link>
                    <Link to='/SignUp' className=" prompt prompt-right " style={!this.state.isSingle ? rowStyle : null}
                          onClick={this.fn}>
                        <p>{this.state.data.group_single_price}</p>
                        <p>单独买</p>
                    </Link>


                </div>
                {/*{this.state.isShowAni?<AddGoodsAnimation/>:null}/>*/}

            </div>
        )
    }
}

export default connect(state => state, actions)(Details)