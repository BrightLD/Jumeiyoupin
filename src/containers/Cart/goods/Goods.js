import React,{Component} from 'react';
import Test from '../images/test.jpg'

export default class Goods extends Component{
    render(){
        return (
            <div>
                <div className="commodity">
                    <div className="commodity-top">
                        <div className="choice-all" onClick={() => this.handleClick()}></div>
                        <div className="group-title">第三方国际发货</div>
                    </div>
                    <div className="commodity-content">
                        <div className="choice">

                        </div>
                        <div className="box-content">
                            <img src={Test} alt=""/>
                            <span>{this.props.goods.data.title}</span>
                            <span className="two">{{/*this.props.Goods.data.style*/}}</span>
                            <span className="third">x{{/*this.props.goods.data.count*/}}</span>
                            <span className="four">¥{{/*this.props.goods.data.price*/}}</span>
                            <span className="fifth">
                                <p>编辑</p>
                            </span>
                        </div>

                        <div className="commodity-bottom">
                            <div className="mian-new">
                                <i className="iconfont icon-mian mian-logo">
                                </i>
                            </div>

                            <p>已享商家包邮</p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}