import React, {Component} from 'react';

import './SignUp.less';
import {signup} from '../../../api/profile'
import Error from "./Error/Error";
import Dialog from '../../../components/Dialog/Dialog'
import {Link} from 'react-router-dom'
export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {isReg: false};
    }


    back = (e) => {
        e.preventDefault();
        window.history.back();
    };


    signup = (e) => {
        e.preventDefault();
        console.log(this.props.history);
        signup({tel: this.tel.value, password: this.pass.value}).then(res => {
            console.log(res);
            if (res.code == 200) {
                this.props.history.push('/login')
            } else {
                this.setState({isReg: true})
            }
        })
    }

    closeDialog=()=>{
        this.setState({isReg:false})
    }
    render() {
        return (
            <div className="login-panel">
                <section className="views">

                    <a className="corner" href="" onClick={this.back}><img className="return"
                                                                           src="https://secure3.jmstatic.com/static_passport/dist/v1.0.28403/touch/login_series/images/NavButtonBack_new.png"/></a>


                    <h1 className="theme">注册</h1>
                    <Link to='/login' className='top'>登录</Link>
                </section>

                <form className="login-form" onSubmit={this.signup}>

                    <div className="other-outer">
                        <div className="other-login">
                            <span className="other-title">使用手机注册</span>
                        </div>
                    </div>

                    <input type="text" className="register" placeholder="请输入11位手机号" ref={tel => this.tel = tel} pattern='^1(3|5|8|7)\d{9}' autoFocus/>

                    <div>
                        <input type="text" className="register-input" placeholder="6-16位登录密码" ref={pass => this.pass = pass} pattern='^[a-zA-Z]\w{5,17}$'/>
                    </div>

                    <input type="submit" value="注册" className="register-button"/>
                    {this.state.isReg ? <Dialog isShow={true} C={Error} content='该手机号已经被注册，请更换手机号注册或尝试登录' close={this.closeDialog}/> : null}


                    <div className="register-agreement">点击注册，表示同意 <a href="http://i.jumei.com/m/account/protocol">《聚美优品用户协议》</a>
                    </div>
                </form>


                <div className="login-panels"></div>
            </div>
        )
    }
}

