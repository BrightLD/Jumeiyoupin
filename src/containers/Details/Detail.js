import React, {Component} from 'react';
import './Detail.less';

export default class Detail extends Component {
    render() {
        return (
            <div className='detail'>
                <img className='goods-pic'
                    src="http://mp5.jmstatic.com/product/001/341/1341627_std/1341627_1000_1000.jpg?v=1502074183&imageView2/2/w/640/q/90"
                    alt=""/>
                <div className="tuan">
                    <h3>
                        <span className='buy-tuan'>￥79</span>
                        <span className='freeShipping'>包邮</span>
                        <span className='buy-personal'>单买价￥119</span>
                        <span onClick='tuan-num'>已有422人参与</span>
                    </h3>
                </div>
            </div>
        )
    }
}
