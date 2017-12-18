/**
 * Created by boos-hjl on 2017/11/22.
 */
import React,{Component} from 'react';
import './Error.less'
export default class Error extends Component{
    render(){
        return (
            <div className="error">
                <div className='notice'>{this.props.content}</div>
                <div className='confirm' onClick={this.props.close}>知道啦</div>
            </div>
        )
    }
}
