import React, {Component} from 'react';
import './Login.less'
import {Link} from 'react-router-dom';
import NavBar from '../../../components/NavBar/navbar'
import {connect} from 'react-redux';
import actions from '../../../store/actions/session';
import Message from "../../../components/Message/index";
import {login} from '../../../api/profile';
import Error from '../SignUp/Error/Error'
import Dialog from '../../../components/Dialog/Dialog';

class Login extends Component {
    constructor() {
        super();
        this.state = {isShow: false}
    }

    close = () => {
        this.setState({isShow: false})
    }
    loginFn = () => {
        let tel = this.username.value;
        let password = this.password.value;

        login({tel, password}).then(res => {
            if (res.code == 200) {
                localStorage.setItem('userInfo', JSON.stringify(res.data));
                this.props.history.push('/profile');



            }
        });
    }
    back = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    componentDidMount() {
        if (localStorage.getItem('userInfo')) {
            this.setState({isShow:true})
            setTimeout(() => {
                this.props.history.push('/profile')

            }, 1000)
        }
        console.log(this.props);
    }

    render() {

        return (

            <div className="login-panel">
               <Dialog isShow={this.state.isShow} C={Error} content='您已经登录啦！'/>

                <section className="views">

                    <a className="corner" href="" onClick={this.back}><img className="return"
                                                                           src="https://secure3.jmstatic.com/static_passport/dist/v1.0.28403/touch/login_series/images/NavButtonBack_new.png"/></a>


                    <NavBar className="theme" title="登录"/>

                    <Link className="top" to="/signup">注册</Link>

                </section>

                <form className="login-form">

                    <div className="other-outer">

                        <div className="other-login">


                            <span className="other-title">使用手机登录</span>

                        </div>
                    </div>
                    <input type="text" className="register"  autoFocus
                           ref={input => this.username = input}
                           placeholder="请输入11位手机号"
                   />
                    <input type="password" className="register t" ref={input => this.password = input}
                           placeholder="请输入密码"
                    />


                    <div>

                        <a className="jm_left" id="use_jumei_account">使用聚美帐号登录</a>

                        <div className="jm_col">30天内自动登录</div>

                    </div>

                    <input onClick={this.loginFn} type="submit" value="登录" className="register-button"/>

                </form>
                <Message {...this.props}/>

                <div className="login-panels"></div>
            </div>

        )
    }
}

export default connect(
    state => state.session,
    actions
)(Login);

