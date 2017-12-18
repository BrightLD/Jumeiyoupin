import React,{Component} from 'react';
import './headtitle.less'
import {HashRouter as Router, Route,Link,} from 'react-router-dom';
export default class HeadTitle extends Component{
    back=()=>{
        window.history.back();
    };
    render(){

        return (
            <div className="head-title">
                <a className="link-back" onClick={this.back}>
                    <i className="iconfont icon-houtui back"/>
                </a>
                <span>{this.props.title}</span>
                <Link to="/">
                    <i className="iconfont icon-shouye1 home"/>
                </Link>
            </div>
        )
    }
}
