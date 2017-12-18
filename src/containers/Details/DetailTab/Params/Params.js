import React,{Component} from 'react';
import './Params.less'
export default class Params extends Component{
    render(){
        return (
            <ul className='goods-detail'>
                <li>
                    <span className='goods-title'>商品名称</span><span className='goods-info'>花王</span>
                </li>
                <li>
                    <span className='goods-title'>品牌</span><span className='goods-info'>花王</span>
                </li>
                <li>
                    <span className='goods-title'>产品包装</span><span className='goods-info'>多款包装随机发货。</span>
                </li>
                <li>
                    <span className='goods-title'>特别说明</span><span className='goods-info'>关于出厂日期较近的纸尿裤有些许异味问题，由于出厂时间短味道没有完全挥发，这并不是产品质量问题，对人体完全没有影响，开封后将纸尿裤放到通风的地方，味道很快就会挥发了，请妈妈们放心使用。</span>
                </li>
                <li>
                    <span className='goods-title'>退货政策</span><span className='goods-info'>本商品不支持退货</span>
                </li>

            </ul>
        )
    }
}
