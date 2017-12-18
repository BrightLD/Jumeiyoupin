/*
* 顶部导航公用组件：
* 接受三个参数：nav_data：导航的内容 [{nav_title:导航的名字,nav_link:路由}]
*               width：导航栏的宽度(rem)（指的是ul的宽度不是div）
*               dropdown：Boolean 是否需要出现下拉菜单
*
* */

import React, {Component} from 'react';
import './index.less';
import {Link, NavLink} from 'react-router-dom';

let lastMove = null;
let moveline = 0;
export default class HeaderNav extends Component {
    constructor() {
        super();
        this.state = {
            drag: false,
            oldClientX: '0',
        }
    }

    getNav_inner(nav_inner) {
        this.nav_inner = nav_inner;
    };

    getnav_dialog(nav_dialog) {
        this.nav_dialog = nav_dialog;
    };

    getIconArrows(icon_arrows) {
        this.icon_arrows = icon_arrows;
    };

    nav_dialog_arrows(){
        if(!this.icon_arrows.style.transform){
            this.icon_arrows.style.transform='rotate(180deg)';
            this.nav_dialog.style.display='block';
        }else {
            this.icon_arrows.style.transform='';
            this.nav_dialog.style.display='';
        }

    }

    startDragMove(e) {
        this.setState({...this.state, drag: true, oldClientX: e.touches[0].clientX});
    };

    dragMove(e) {
        let move = (e.touches[0].clientX - this.state.oldClientX)/100;

        let maxWidth = parseFloat(this.props.width) - document.body.clientWidth/100;
        if (this.state.drag) {
            if (move < 0) {
                if (Math.abs(moveline) >= maxWidth) {

                    maxWidth=-maxWidth+'rem';
                    console.log(maxWidth);
                    this.nav_inner.style.transform = `translateX(${maxWidth})`;
                    return;
                }
                move = move * .05 + parseFloat(moveline);
            } else if (move >= 0) {
                if (moveline >= 0) {
                    this.nav_inner.style.transform = 'translateX(0)';
                    return;
                }
                move = move * .05 + parseFloat(moveline);

            }
            move = move + 'rem';    
            this.nav_inner.style.transform = 'translateX(' + move + ')';
            /translateX\((-?\d+.?\d*)rem\)/g.exec(this.nav_inner.style.transform) === null ? moveline = 0 : moveline = /translateX\((-?\d+.?\d*)rem\)/g.exec(this.nav_inner.style.transform)[1];
        }
    }

    endDragMove() {
        this.setState({
            drag: false,
            oldClientX: '0',
        })
    };

    componentDidMount() {
    }

    render() {
        return (
            <div className="header_nav_box">
            <div className="header_nav">
                <ul style={{width: this.props.width < document.body.clientWidth ? document.body.clientWidth : this.props.width}}
                    onTouchStart={this.startDragMove.bind(this)} onTouchMove={this.dragMove.bind(this)}
                    onTouchEnd={this.endDragMove.bind(this)} ref={$this => this.getNav_inner($this)}
                    className="nav_inner">
                    {this.props.nav_data.map((item, index) => {
                        return <NavLink exact key={index}  to={item.nav_link}><li className="nav_inner_items"> {item.nav_title}
                        </li></NavLink>
                    })}
                </ul>
                {this.props.dropdown==true?<div onClick={()=>{this.nav_dialog_arrows()}} className="nav_dialog_arrows">
                    <i ref={$this => this.getIconArrows($this)} className="icon-arrows"></i></div>:null}

            </div>
                <ul ref={$this => this.getnav_dialog($this)} className="nav_dialog">
                    {this.props.nav_data.length>0?this.props.nav_data.map((item, index) => {
                        return <li key={index} className="nav_dialog_items">
                            {item.nav_title}
                        </li>
                    }):null}
                </ul>
            </div>
        )
    }
}