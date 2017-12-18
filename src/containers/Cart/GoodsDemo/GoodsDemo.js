import React, {Component} from 'react';
import '../Cart.less'

export default class GoodsDemo extends Component {
    constructor() {
        super();
        this.state = {seconds: 9, minute: 2, count: 2, list: [], isAllSel: false}
    }

    handleClick = () => {
        let oFifth = document.getElementsByClassName('fifth')[0];
        let oEdit = document.getElementsByClassName('edit')[0];
        let oModify = document.getElementsByClassName('modify')[0];
        let oDescribe = document.getElementsByClassName('describe')[0];
        let oCount = document.getElementsByClassName('Count')[0];
        oEdit.style.display = 'none';
        oModify.style.display = 'block';
        oDescribe.style.display = 'none';
        oCount.style.display = 'block';
    }

    mouseClick() {
        let oFifth = document.getElementsByClassName('fifth')[0];
        let oEdit = document.getElementsByClassName('edit')[0];
        let oModify = document.getElementsByClassName('modify')[0];
        let oDescribe = document.getElementsByClassName('describe')[0];
        let oCount = document.getElementsByClassName('Count')[0];
        oEdit.style.display = 'block';
        oModify.style.display = 'none';
        oDescribe.style.display = 'block';
        oCount.style.display = 'none';
    }

    reduceClick() {
        let oCount = document.getElementsByClassName('count')[0];
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1,
            })

        }

    }

    plusClick() {
        let oPrompt = document.getElementsByClassName('prompt')[0];
        if (this.state.count < 10) {
            this.setState({
                count: this.state.count + 1,
            })
        }
        if (this.state.count === 10) {
            oPrompt.style.display = 'block';
            let pro = setInterval(() => {
                oPrompt.style.display = 'none';
                clearInterval(pro)
            }, 2000)
        }

    }

    choiceClick() {
        let oChoice = document.getElementsByClassName('choice')[0];
        // oChoice.style.

    }

    localSelection() {
        let oLocalSelection = document.getElementsByClassName('Local-selection')[1];
        let oCommodityBottom = document.getElementsByClassName('commodity-bottom')[1];
        let oChoice = document.getElementsByClassName('choice')[1];

        if (oCommodityBottom.style.display == 'block') {
            oCommodityBottom.style.display = 'none';
            oLocalSelection.style.backgroundColor = '#ffffff';
            oChoice.style.backgroundColor = '#ffffff';
            oLocalSelection.style.border = '1px solid #999999';
            oChoice.style.border = '1px solid #999999';

            return
        } else {
            oCommodityBottom.style.display = 'block';
            oLocalSelection.style.backgroundColor = '#fe4070';
            oChoice.style.backgroundColor = '#fe4070';
            oLocalSelection.style.border = '1px solid #fe4070';
            oChoice.style.border = '1px solid #fe4070';
            return
        }
    }

    handleSelector(e) {
        let cartLists = this.refs.cartLists;
        let n = 0;
        let t = 0;
        let choiceLists = cartLists.getElementsByClassName('choice');
        let LocalSelection = cartLists.getElementsByClassName('Local-selection')[0];


        if (e.target.className !== 'Local-selection') {
            if (e.target.className == 'choice selector') {
                e.target.classList.remove('selector');
            } else if (e.target.className == 'choice') {
                e.target.classList.add('selector');
            }
            for (let i = 0; i < choiceLists.length; i++) {
                let items = choiceLists[i];
                if (items.className == 'choice') {
                    n++;
                    continue
                }
            }
            if (n > 0) {
                LocalSelection.classList.remove('selector');
                n = 0;
            } else {
                LocalSelection.classList.add('selector');
            }

        }
        if (e.target.className == 'local-selection') {
            if (e.target.classname == 'Local-selection selector') {
                e.target.classList.remove('selector');
                let y = [];
                y.push(choiceLists);
            } else {
                e.target.classList.add('selector');
            }
        }


        // for (let i = 0; i < choiceLists.length; i++) {
        //     console.log(9);
        //     let item = choiceLists[i];
        //    if(){
        //        item.classList.remove('selector');
        //        console.log(1);
        //    }else if(){
        //        item.classList.add('selector');
        //        console.log(2);
        //    }
        // }

        // }
    }

    render() {
        return (
            <li className='goods-cart-list'>
                <div className="ss">第三方国际发货</div>
                <div className="commodity-content">
                    <div className={this.props.item.isSel ? "choice sel" : "choice"}
                         onClick={() => this.props.changeSel(this.props.item.id,this.props.item.style)}>

                    </div>
                    <div className="box-content">
                        <img src={this.props.item.image} alt=""/>
                        <span>{this.props.item.title}</span>
                        <div className="describe">
                            <span className="two">{this.props.item.style}</span>
                            {/*<span className="third">x{this.props.item.count}</span>*/}
                        </div>

                        <div className="Count">
                            <span className="reduce" onClick={() => {
                                this.props.sub(this.props.item.id,this.props.item.style)
                            }}>-</span>
                            <span className="countNum">{this.props.item.count}</span>
                            <span className="plus" onClick={() => {
                                this.props.add(this.props.item.id,this.props.item.style)
                            }}>+</span>
                        </div>
                        <span className="four">{this.props.item.price}</span>

                    </div>
                    <div className="prompt"><p>一次最多只能购买十件，您可以结束完之后再购买</p></div>


                </div>
                <div className="editArea">
                    <div className="edit" ref={edit=>this.edit=edit} onClick={() => {
                        this.props.del(this.props.item.id,this.props.item.style)
                    }}><p>删除</p></div>
                    <div className="modify" ref={modifyEle=>this.modifyEle=modifyEle}>
                                 <span onClick={() => {
                                     console.log(this.props.item.id);
                                     this.props.del(this.props.item.id,this.props.item.style)
                                 }}>删除</span>
                        <span className="line">|</span>
                        <span>完成</span>

                    </div>

                </div>
            </li>

        )
    }
}
