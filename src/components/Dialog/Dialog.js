import React, {Component} from 'react';
import './Dialog.less';

export default class Dialog extends Component {
    constructor() {
        super();
    }

    render() {
        let C=this.props.C;
        return (
            <div onClick={this.handleClick}>
                {
                    this.props.isShow ? (<div className="dialog">

                    </div>) : null
                }

                {this.props.isShow?<C content={this.props.content} close={this.props.close}/>:null}
            </div>
        )
    }
}
