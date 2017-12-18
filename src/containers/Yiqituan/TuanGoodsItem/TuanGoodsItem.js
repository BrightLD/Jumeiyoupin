import React,{Component} from 'react';
import getTuan from '../../../api/tuan';
import actions from '../../../store/actions/index';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {post} from '../../../api/base';
class TuanGoodsItem extends Component{
    constructor(){
        super();
        this.state={
            list:[]
        }
    }
    componentDidMount(){
        let url='';
        if(this.props.match.path=='/yiqituan/'){
            url+='recommand';
        }else{
            url=this.props.match.path.match(/\/yiqituan\/(.*)/)[1]
        }
        let item=this.props.tuan.find(item=>item.name==url);
        if(!item){
            post('/pintuan/'+url,{pages:1}).then(res=>{
                this.setState({
                    list:res.data
                });
                this.props.getTuan({
                    name:url,
                    list:res.data
                })
            });

        }else{
            this.setState({
                list:[
                    ...item.list,
                ]
            })
        }

    }
    componentWillUpdate(){
        let url='';
        if(this.props.match.path=='/yiqituan/'){
            url+='recommand';
        }else{
            url=this.props.match.path.match(/\/yiqituan\/(.*)/)[1]
        }
        let item=this.props.tuan.find(item=>item.name==url);
        if(item && this.state.list.length!=item.list.length){
            this.setState({
                list:[
                    ...item.list,
                ]
            })

        }
    }
    render(){

        return (
            <ul className="product-con">
                {
                    this.state.list.map((item, index) => (

                        <li key={index} className="product">
                            <Link to={{pathname:`/details/${item.item_id}/${item.type}`,state:{item}}}>
                                <div className="people-number">{item.deal_comments_number}条评论</div>

                                <div className="goods-topsmall">
                                    <img
                                        src={item.image}/>
                                </div>

                                <div className="goods-middle">
                                <span className="goods-num">
                                    {item.group_name_tag}
                                </span>
                                    {item.short_name}
                                </div>

                                <div className="goods-foot">
                                    <div className="price-left">
                                        <span className="ct-price">{item.jumei_price}</span>
                                        <span className="sc-price">{item.market_price}</span>
                                        <span className="jm-price">{item.single_price}</span>
                                    </div>
                                    <div className="time-right timer">
                                        <span className="goods-btn">去开团</span>
                                    </div>

                                </div>

                            </Link>

                        </li>

                    ))
                }

            </ul>
        )
    }
}
export default connect(state=>state,actions)(TuanGoodsItem)