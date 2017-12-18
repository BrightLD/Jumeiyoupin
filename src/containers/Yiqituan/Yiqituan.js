import React, {Component} from 'react';
import './index.less'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import actions from '../../store/actions/index';
import {upMore,downRefresh} from '../../utils/utils';
import NoMore from "../../components/NoMore/NoMore";
import AddMore from "../../components/AddMore/AddMore";
import {get,post} from '../../api/base';
import HeaderNav from "../../components/HeaderNav/index";
import {Route} from 'react-router-dom';
import TuanGoodsItem from "./TuanGoodsItem/TuanGoodsItem";
import Headers from "../../components/Headers/index";
class Yiqituan extends Component {

    componentDidMount() {
        let url=location.hash.substring(11);
        this.ele.addEventListener('scroll', () => {
            if (this.state.isLoad) return;
            upMore(this.ele, () => {
                let item=this.props.tuan.find(item=>item.name==url);
                
                clearInterval(this.ele.addTimer);
                this.setState({
                    isLoad: true
                });
                this.ele.addTimer = setTimeout(() => {
                    post(`/pintuan/${url}`,{pages:item.pages}).then(res => {
                        this.props.getTuan({
                            name:url,
                            list:res.data
                        });
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
                    getTuan(`/api/tuan?offset=0&limit=5`).then(res => {
                        this.props.getTuan(res.data);
                    })
                }, 100);
            })
        })
        get('/tuantab').then(res=>{
            this.props.getTuanTab(res);
        })
    }
    constructor() {
        super();
        this.state={

        }
    }

    render() {
        return (
            <section className="product-items" ref={ele=>this.ele=ele}>
                {this.props.tuanTab.length>0?<HeaderNav nav_data={this.props.tuanTab} width='0.44'/>:null}
                {
                    this.props.tuanTab.length>0?this.props.tuanTab.map((item,index)=>(
                        <Route key={index} path={`${item.nav_link}`} component={TuanGoodsItem}/>
                    )):null
                }


                {
                    this.props.tuan[this.state.url]&&this.props.tuan[this.state.url].pages >= 3 ? <NoMore/> : <AddMore/>
                }
            </section>
        )
    }
}
export default connect(state=>state,actions)(Yiqituan);