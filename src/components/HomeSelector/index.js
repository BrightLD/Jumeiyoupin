import React, {Component} from 'react';
import './index.less';

export default class HeaderSelector extends Component {
      constructor(){
          super();
      }
    handleSelector() {
        let selectorPageBox = document.getElementsByClassName('header-selector-page-box')[0],
            selectorPage = document.getElementsByClassName('header-selector-page')[0],
        selectorText = document.getElementsByClassName('selector-text')[0];
        selectorPageBox.style.display = 'block';
        selectorPage.tiemrId=setInterval(()=>{
            let val=5,
            leftVal=parseFloat(selectorPage.style.left)||100;
            if(leftVal-val<=0){
                selectorPage.style.left =0+'%';
                clearInterval( selectorPage.tiemrId);
            }
            selectorPage.style.left = leftVal-val+'%';

        },17)
    }
    showSelectorClass(){
        let selectorPageBox = document.getElementsByClassName('header-selector-page-box')[0],
            selectorSimulation = document.getElementsByClassName('selector-simulation')[0],
            Header_houtui = document.getElementsByClassName('header-selector-houtui')[0],
            selectorNavTxt = document.getElementsByClassName('selector-nav-txt')[0],classify = document.getElementsByClassName('classify')[0],
            selectorPage = document.getElementsByClassName('header-selector-page')[0];
        selectorPageBox.style.display='block';
        selectorPage.style.width='80%';
        selectorPage.style.left='20%';
        selectorSimulation.style.marginLeft='.1rem';
        Header_houtui.style.display='none';
        selectorNavTxt.innerText='返回';
        classify.style.display='block';
        selectorNavTxt.onclick=function () {
            selectorPageBox.style.display='';
            selectorPage.style.width='';
            selectorPage.style.left='0%';
            selectorNavTxt.innerText='搜索';
            selectorSimulation.style.marginLeft='';
            Header_houtui.style.display='';
            classify.style.display='';
            selectorNavTxt.onclick=null;
        }
    }

    render() {
        return (
            <header className="header-selector">
                <div className="selector-simulation" onClick={() => {this.handleSelector()}}><i className="selector-icon"></i><span
                    className="selector-text">搜索商品 分类 功效</span>
                </div>
                <div className="selector-nav" onClick={() => {this.showSelectorClass()}}><span className="selector-nav-txt"
                ></span></div>
            </header>
        )
    }
}
