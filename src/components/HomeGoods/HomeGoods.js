import React,{Component} from 'react';
import './HomeGoods.less';
import {Link,NavLink} from 'react-router-dom';
export default class HomeGoods extends Component {
    render() {
        console.log(this.props.item)
        return (
            <li className="home-goods" data-productid={this.props.item.product_id}>
                <NavLink to={{pathname:`/details/${this.props.item.product_id}/formal`,state:this.props.item}}>
                    {
                        this.props.item.image_url_set.main ? <img src='' alt=""/> : <div><img src='#' alt=""/><div className="goodsInfo">
                            <h3 className="goods-title">{this.props.item.name}</h3>
                            <p className="priceList">
                                <span className="current-price">￥<span>{this.props.item.jumei_price}</span></span>
                                <span className="init-price">￥<span>{this.props.item. market_price}</span></span>
                            </p>
                            <p className="commentNum">
                                {this.props.item.deal_comments_number
                                }条评论
                            </p>
                        </div></div>
                    }
                </NavLink>
            </li>
        )

    }
}