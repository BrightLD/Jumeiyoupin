import React, {Component} from 'react';
import './SearchPage.less';

export default class SearchPage extends Component {
    preventDefault=(e)=>{
        e.stopPropagation();
        console.log('a')
    }
    render() {
        return (
            <div className="searchPage" onClick={this.preventDefault}>
                <div>
                    <img src="//f0.jmstatic.com/btstatic/h5/common/left_arrow.png" alt=""/>
                    <div className="searchInputArea">
                        <img src="//f0.jmstatic.com/btstatic/h5/common/search_btn.png" alt=""/>
                        <input type="text" placeholder="搜索商品名称、品牌、功效"/>
                    </div>
                    <span>搜索</span>
                </div>
            </div>
        )
    }
}
