import React,{Component} from 'react';
import './AddGoodsAnimation.less';
export default class AddGoodsAnimation extends Component{

    render(){
        console.log('aa');
        return (
            <div className='add-animation' ref={ref=>this.ref=ref} id='addGoodsAnimation'>
                +1
            </div>
        )
    }
}
