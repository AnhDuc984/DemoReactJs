import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userServices';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnchangeUserName = (e) => {
        this.setState({
            Username: e.target.value
        })

    }
    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })

    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.Username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage
                    })
                }
            }
        }

    }
    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {



        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.Username}
                                onChange={(e) => this.handleOnchangeUserName(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? ' text' : 'password'}
                                    placeholder='Enter your password' className='form-control'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangePassword(e)}
                                />
                                <span
                                    onClick={this.handleShowPassword}
                                >
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : "far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login'
                                onClick={() => {
                                    this.handleLogin()
                                }}
                            >Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-5'>
                            <span className='text-other-login'>Or login with :</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
