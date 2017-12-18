import React, {Component} from 'react';
import './index.less';
import {Link, NavLink} from 'react-router-dom';
import {get,post} from '../../api/base';
let hostUrl = 'http://localhost:3000';
let headUrl = 'm.jumei.com//search/index?category_id=';
export default class HeaderSelectorPage extends Component {
    ;

    constructor() {
        super();
        this.state = {
            classifyInfo: {
            },
            recommendListData: {}
        }
    }

    getClassifyInfo(classifyInfo) {
        this.classifyInfo = classifyInfo;
    }

    handleSelectorPage=()=> {
        let headers=new Headers({
            "Accept":"application/json",
            "Accept-Encoding":"gzip, deflate",
            "Accept-Language":"zh-CN,zh;q=0.9",
            "Content-Type":"application/json; charset=utf8"
        })
        let selectorSimulation = this.refs.selectorSimulation,
            selectorNavTxt = this.refs.selectorNavTxt,
            selectorText = this.refs.selectorText,
            selectorPageBox = this.refs.selectorPageBox,
            selectorPage = this.refs.selectorPage,
            classify = this.refs.classify,
            recommend_lists = this.refs.recommend_lists,
            Header_houtui = this.refs.Header_houtui;
        selectorText.oninput= ()=> {
            if (selectorText.value.length > 0) {
                fetch(`http://mobile.jumei.com/msapi/search/suggestion.json?keyword=${selectorText.value}&url=http://mobile.jumei.com/msapi/search/suggestion.json`,{
                    method:'GET',
                    credentials:'include',
                    headers:headers,
                    mode:"no-cors"
                }).then((res)=>{
                    console.log(res);
                })
                recommend_lists.style.display = 'block';
            } else {
                recommend_lists.style.display = '';
            }
        }
        selectorSimulation.onclick=function () {
            selectorPage.style.width = '';
            selectorPage.style.left = '0%';
            selectorNavTxt.innerText = '搜索';
            selectorSimulation.style.marginLeft = '';
            Header_houtui.style.display = '';
            classify.style.display = '';
            selectorNavTxt.onclick = function () {
                // selectorPageBox.style.display = '';
                // selectorPage.style.width = '';
                // selectorPage.style.left = '0%';
                // selectorNavTxt.innerText = '搜索';
                // selectorSimulation.style.marginLeft = '';
                // Header_houtui.style.display = '';
                // classify.style.display = '';
                selectorNavTxt.onclick = null;
            }
        }
        Header_houtui.onclick = function (e) {
            selectorPage.style.width = '80%';
            selectorPage.style.left = '20%';
            selectorSimulation.style.marginLeft = '.1rem';
            Header_houtui.style.display = 'none';
            selectorNavTxt.innerText = '返回';
            classify.style.display = 'block';
            selectorNavTxt.onclick = function () {
                selectorPageBox.style.display = '';
                selectorPage.style.width = '';
                selectorPage.style.left = '0%';
                selectorNavTxt.innerText = '搜索';
                selectorSimulation.style.marginLeft = '';
                Header_houtui.style.display = '';
                classify.style.display = '';
                selectorNavTxt.onclick = null;
            }
        }
    }
    classifyInfo_subShow(e) {

        let classifyInfo_sub = e.target.getElementsByClassName('classifyInfo_sub')[0];
        let classifyInfo_subList = this.classifyInfo.getElementsByClassName('classifyInfo_sub');
        let classifyInfo_items = this.classifyInfo.getElementsByClassName('classifyInfo_items');
        let showEle = Array.prototype.filter.call(classifyInfo_subList, item => item === classifyInfo_sub);

        if (e.target.className == 'classifyInfo_items active') {
            e.target.classList.remove('active');
            showEle[0].style.display = '';

        } else if (e.target.className == 'classifyInfo_items') {
            e.target.classList.add('active');
            showEle[0].style.display = 'block';
        }
        for (let i = 0; i < classifyInfo_items.length; i++) {
            let items = classifyInfo_items[i];
            if (items === e.target) continue;
            items.classList.remove('active');
        }
        for (let i = 0; i < classifyInfo_subList.length; i++) {
            let items = classifyInfo_subList[i];
            if (items === classifyInfo_sub) continue;
            items.style.display = '';
        }


    }

    componentDidMount() {
        this.handleSelectorPage();
        get(`/getsearchnav`).then((res) => {
            console.log(res);
            this.setState({...this.state, classifyInfo: res})
        }).catch((e) => {
            console.log(e);
        })
    }

    render() {
        return (
            <div className="header-selector-page-box" ref="selectorPageBox">
                <div className="header-selector-page" ref="selectorPage">
                    <div className="header-selector-inner">
                        <i className="header-selector-houtui" ref="Header_houtui"><img
                            src="//f0.jmstatic.com/btstatic/h5/common/left_arrow.png" alt=""/></i>
                        <div ref="selectorSimulation" className="selector-simulation"><i
                            className="selector-icon">

                        </i><input
                            className="selector-text" ref="selectorText" placeholder="搜索商品名称、分类、功效">

                        </input>
                        </div>
                        <div className="selector-nav"><span className="selector-nav-txt" ref="selectorNavTxt">搜索</span>
                        </div>
                        <ul className="recommend_lists" ref="recommend_lists">
                            {this.state.recommendListData.data==undefined?null:this.state.recommendListData.data.length> 0 ? this.state.recommendListData.data.map((item, index) => {
                                return <li key={index} className="recommend_list">
                                    <a href="" className="recommend_name">{item}</a>
                                    <span className="recommend_arrow"></span>
                                </li>
                            }): null}
                        </ul>
                    </div>
                    <div className="classify" ref="classify">
                        <ul ref={$this => {
                            this.getClassifyInfo($this)
                        }} onClick={this.classifyInfo_subShow.bind(this)} className="classifyInfo">
                            {this.state.classifyInfo.data==undefined?null:this.state.classifyInfo.data.length > 0 ? this.state.classifyInfo.data.map((item, index) => {
                                return <li key={index} category_id={item.category_id} className="classifyInfo_items">{item.name}
                                    <span className="classifyInfo_items_arrow"></span>
                                    {item.sub_categories.length > 0 ?<ul className="classifyInfo_sub">{item.sub_categories.map((item, index) => {
                                            return <NavLink to='/' key={index}><li onClick={(e) => {e.stopPropagation()
                                            }} key={index} data-category_id={item.category_id}
                                                                       className="classifyInfo_sub_items">
                                                {item.name}
                                            </li></NavLink>
                                        })}</ul> : null}
                                </li>
                            }) : null}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}