import React, {Component} from 'react';
import './Search.less';
import Dialog from "../Dialog/Dialog";
import SearchPage from "./SearcnPage/SearchPage";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            showSearchPage: false,
        }
    }

    handleClick = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    searchInputEvent = () => {
        this.setState({
            showSearchPage: true
        })
    }

    render() {
        return (
            <div className="search" onClick={this.handleClick}>
                <Dialog isShow={this.state.isShow} C={SearchPage}/>

                <div className="search-input" onClick={this.searchEvent}>
                    <img src="//f0.jmstatic.com/btstatic/h5/common/search_btn.png" alt=""/>
                    <span>搜索商品 分类 功效</span>
                </div>
                <img src="//f0.jmstatic.com/btstatic/h5/index/search_list2.png" alt=""/>
            </div>
        )
    }
}
