import React,{Component} from 'react';
import {Route,Link} from 'react-router-dom'
import './test.less'
import T from './T/T.js'
export default class Test extends Component{
    render(){
        return (
            <div className='a'>
                adfasdf
                <Link to='/test/'>tttt</Link>
                <Route path='/test/' component={T}/>
            </div>
        )
    }
}
