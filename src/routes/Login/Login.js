import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import './Login.css';

import API from '../../API';

class LoginPage extends Component{
    state = {
        email: '',
        password: ''
    }

    _handleInputChange = inputKey => e => {
        this.setState({ [inputKey]: e.target.value })
    }

    _submit = () => {
        const error = this._validate(this.state);
        if(error){
            alert(error)
        } else {
            this._login()
        }
    }

    _validate = payload => {
        const { email, password } = payload;
        if(!email){
            return 'Please enter an email'
        }
        if(!password){
            return 'Please enter a password'
        }
    }

    _login = () =>{
        const { email, password } = this.state;
        API.login({ email,password }).then(res =>{
            if(res.err){
                alert(res.err)
            } else {
                this.props.dispatch({type:"LOGIN_SUCCESS",
                    user: res.data.user
                })
                if(res.data.user.priviledge_level === 2){
                    this.props.history.push('/my-profile')
                } else {
                    this.props.history.push('/admin/orders')
                }
                
            }
        })
    }

    render(){
        const { email, password } = this.state;
        return(
            <div className='container-fluid'>
                <div className='col-sm-offset-3 col-sm-6 login-container'>

                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input 
                                className='form-control' 
                                id='email'
                                value={email}
                                onChange={this._handleInputChange('email')}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='form-group'>
                            <label htmlFor='password'>Password:</label>
                            <input 
                                className='form-control' 
                                id='password'
                                type='password'
                                value={password}
                                onChange={this._handleInputChange('password')}
                            />
                        </div>
                    </div>

                    <button 
                        className='btn btn-success form-button'
                        onClick={this._submit}
                    >LOGIN</button>

                    <button 
                        className='btn btn-info form-button'
                        onClick={()=>this.setState({
                            email:'frooto@outlook.com',
                            password:'tomo'
                        })}
                    >Admin credentials</button>

                    <button 
                        className='btn btn-info form-button'
                        onClick={()=>this.setState({
                            email:'konzum@konzum.com',
                            password:'tomo'
                        })}
                    >Customer credentials</button>

                </div>
            </div>
        )
    }
}

const connectedLogin = connect(
    store => ({ userState : store.userState })
)(LoginPage);
export default withRouter(connectedLogin);