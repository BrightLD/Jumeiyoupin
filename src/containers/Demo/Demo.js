import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';
export default class Demo extends Component{
    render(){
        return (
            <div>
                这是Demo
                <Link to='/demo/a'>goT</Link>
            </div>
        )
    }
}
