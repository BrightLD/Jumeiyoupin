import React, {Component} from 'react';
import HomeGoods from "../../components/HomeGoods/HomeGoods";
import getHomeList from '../../api/getHomeLIst';

import HeaderSelector from "../../components/HomeSelector/index";
import HeaderNav from "../../components/HeaderNav/index";
import HeaderSelectorPage from "../../components/HeaderSelectorPage/index";





import {connect} from 'react-redux';
import actions from '../../store/actions/index';
import './Home.less';
import {upMore, downRefresh} from "../../utils/utils";
import NoMore from "../../components/NoMore/NoMore";
import AddMore from "../../components/AddMore/AddMore";
import Headers from "../../components/Headers/index";
let navAry=[{nav_title:'首页',nav_link:'/'},{nav_title:'极速免税店',nav_link:'/home/quicklyshop'},{nav_title:'母婴',nav_link:'/home/baby'},{nav_title:'轻奢',nav_link:'/home/luxyxy'},{nav_title:'名品专卖',nav_link:'/home/pop'}];
class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoad: false

        }
    }

    componentDidMount() {
        getHomeList(`/home?pages=1&type=formal`).then(res => {
            this.props.getHomeList({pages:0,type:'pre',data:res.item_list});
        });
        this.ele.addEventListener('scroll', () => {
            if (this.state.isLoad) return;
            upMore(this.ele, () => {
                /*if (this.props.homeGoodsList.isMore == 0) return;*/
                clearInterval(this.addTimer);
                this.setState({
                    isLoad: true
                });
                this.addTimer = setTimeout(() => {
                    console.log(this.props.homeGoodsList.pages);
                    getHomeList(`/home?pages=${this.props.homeGoodsList.pages}&type=${this.props.homeGoodsList.type}`).then(res => {
                        this.props.getHomeList({pages:this.props.homeGoodsList.pages,type:this.props.homeGoodsList.type,data:res.item_list});
                        this.setState({isLoad: false});
                    })
                }, 1500);
            })
        });
        this.ele.addEventListener('scroll', () => {
            downRefresh(this.ele, () => {
                clearInterval(this.timer);
                clearInterval(this.addTimer);
                this.timer = setTimeout(() => {
                    getHomeList(`/home?pages=1&type=pre`).then(res => {

                        this.props.resetHomeList({pages:1,type:this.props.homeGoodsList.type,data:res.item_list});
                    })
                }, 100);
            })

        })
    }

    render() {
        let {data} = this.props.homeGoodsList;
        return (
            <div className="content" ref={ele => this.ele = ele}>

                <HeaderSelectorPage/>
                <HeaderSelector/>
                <HeaderNav nav_data={navAry} width={'3.85rem'} dropdown={false}/>

                <ul>
                    {
                        data.length>0?data.map((item, index) => {
                            return <HomeGoods item={item} key={index}/>
                        }):null
                    }

                </ul>
                {
                    data.length== 0 ? <NoMore/> : <AddMore/>
                }

            </div>
        )
    }

}

export default connect(state => state, actions)(Home);
