import React,{Component} from 'react';
import './index.less';
export default class Headers extends Component{
    render(){
        return (
            <header className="headersBox">
                <a href="" className="headers-back"></a>
                <div className="headers-title">{this.props.title?this.props.title:null}</div>
                <a href="" className="headers-home"></a>
            </header>
        )
    }
}