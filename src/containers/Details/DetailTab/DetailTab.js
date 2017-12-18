import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './DetailTab.less'

export default class DetailTab extends Component {
    render() {
        console.log('-----------------------',this.props.goodsInfo);
        return (
            <ul className='detail-tab'>
                <li>
                    <NavLink exact to={`/details/${this.props.item_id}/${this.props.type}/`}>
                        图文详情
                    </NavLink>
                </li>
                <li>
                    <NavLink to={{pathname:`/details/${this.props.item_id}/${this.props.type}/params`,state:this.props.goodsInfo}}>
                        商品参数
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/details/${this.props.item_id}/${this.props.type}/comment`}>
                        评价
                    </NavLink>
                </li>

            </ul>
        )
    }
}
