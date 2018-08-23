import React, { Component } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import API from '../../API';
import './Navigation.css'

class Navigation extends Component{
    state = {
        subnavigationShown: false
    }

    _toggleNavigation = () => {
        this.setState({ subnavigationShown:!this.state.subnavigationShown })
    }

    componentDidMount(){
        this._checkIfLoggedIn()
    }

    _checkIfLoggedIn = () => {
        API.query(`
        query me{
            me{
                id
                priviledge_level
            }
        }
        `).then(res => {
            if(res.data && res.data.me){
                this.props.dispatch({type:"LOGIN_SUCCESS",
                    user: res.data.me
                })
            }
        })
    }

    render(){
        const { userState:{ user } } = this.props;

        let links;
        if(!user){
            links = [{label:'Log in', to: '/'}]
        }else if (user.priviledge_level === 1){
            links = [
                {label:'Fruits', to:'/admin/fruits'},
                {label:'Clients', to:'/admin/clients'},
                {label:'Orders', to:'/admin/orders'}
            ]
        } else if (user.priviledge_level === 2){
            links = [
                {label:'Place an order', to:'/new-order'},
                {label:'My orders', to:'/my-orders'},
                {label:'Profile', to:'/my-profile'}  
            ]
        }

        return(
            <div>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='navigation'>

                        <div className='col-xs-6'>
                            <Link to='/'>
                                <img src='/images/logo.png' className='navigation__logo' />
                                <h1 className='navigation__title'>Frooto</h1>
                            </Link>
                        </div>

                        <div className='col-xs-6'>
                            <div className='pull-right navigation__navlink-container'>
                                {links.map(link => <NavLink key={link.to} className='navigation__navlink hidden-xs' to={link.to}>{link.label}</NavLink>)}
                                <span 
                                    className='glyphicon glyphicon-align-justify navigation__dropdown-button visible-xs'
                                    onClick={this._toggleNavigation}
                                />    
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='subnavigation' style={{ top:this.state.subnavigationShown ? 60 : -100 }}>
                {links.map(link =>
                <div className='subnavigation__row' key={link.to}>
                     <NavLink className='navigation__navlink' to={link.to}>{link.label}</NavLink>
                 </div>
                )}
            </div>

            <div className='navigation__top-flow-div'/>

            </div>
        )
    }
}

const reduxConnectedNavigation = connect(
    store => ({ userState: store.userState }),
    null
  )(Navigation);

export default withRouter(reduxConnectedNavigation);
