import React,{Component} from 'react';
import './images';
import './index.less';
export default class Home extends Component{
    render(){
        return (
            <div>
                <div className="header">
                    <div>海外直供</div>
                    <div>原装正品</div>
                    <div>急速到货</div>
                    <div>轻松退货</div>
                </div>
                <div><img src="" alt=""/> <span></span></div>
                <div>
                    <img src="" alt=""/>
                    <div>
                        <div className="top"></div>
                        <span className="new"></span>
                        <span className="old"></span>
                    </div>
                </div>
            </div>
        )
    }
}