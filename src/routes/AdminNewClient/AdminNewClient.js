import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import API from '../../API';
import { PageHeader } from '../../components'

class AdminNewClientPage extends Component{
    state = {
        label: '',
        email: '',
        phone: '',
        password: ''
    }

    _handleInputChange = inputKey => e => {
        this.setState({ [inputKey]: e.target.value })
    }

    _submit = () => {
        const err = this._validate(this.state);
        if(err){
            alert(err)
        } else {
            const { label, password, email, phone } = this.state;
            const officeList = this.officesInput.collect();
            API.query(`
            mutation createCustomer{
                createCustomer(input:{
                label:"${label}",
                password:"${password}",
                email:"${email}",
                phone:"${phone}"
                officeList:[
                  ${officeList.map(office => `{address:"${office.address}"}`)}
                ]
              }){
                label
                email
                phone
                officeList{
                  id
                  userId
                  address
                }
              }
            }
            `).then(res => {
                if(res.error){
                    alert(res.error)
                } else if(res.data){
                    this.props.history.push('/admin/clients')
                }
            })
        }
    }

    _validate = fields =>{
        const { label, email, phone, password } = fields;
        if(!label){
            return 'Please provide a label'
        }
        if(!email){
            return 'Please provide an email'
        }
        if(!phone){
            return 'Please provide a phone number'
        }
        if(!password){
            return 'Please provide a password'
        }
        if(password.length < 5){
            return 'Entered password is too short'
        }
    }

    render(){
        return(
            <div className='container'>
                <PageHeader title='New Client Form' />

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='label'>Label:</label>
                        <input 
                        className='form-control'
                        id='label' 
                        value={this.state.label} 
                        onChange={this._handleInputChange('label')}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                        className='form-control'
                        id='email' 
                        value={this.state.email} 
                        onChange={this._handleInputChange('email')}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone:</label>
                        <input
                        className='form-control' 
                        id='phone' 
                        value={this.state.phone} 
                        onChange={this._handleInputChange('phone')}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                        className='form-control'
                        id='password' 
                        value={this.state.password} 
                        onChange={this._handleInputChange('password')}
                        type='password'
                        />
                    </div>
                </div>

                <OfficeListInput 
                    ref={ref => this.officesInput = ref}
                />

                <button 
                className='btn btn-success form-button'
                onClick={this._submit}
                >
                SUBMIT
                </button>
            </div>
        )
    }
}

export default withRouter(AdminNewClientPage);

class OfficeListInput extends Component{
    state = {
        address: '',
        offices: []
    }

    _handleInputChange = e =>{
        this.setState({ address: e.target.value })
    }

    _addOffice = () => {
        const { address, offices } = this.state;
        if(address){
            this.setState({ 
                offices: [...offices, { address } ], 
                address: ''
            })
        }
    }

    _removeOffice = address => e =>{
        const { offices } = this.state;
        this.setState({ offices: offices.filter(office => office.address !== address) })
    }

    collect = () => this.state.offices

    render(){
        return(
            <div className='row office-input'>
                <h5>Offices</h5>
                <div className='form-group'>
                    <label htmlFor='office-input'>New Office Address:</label>
                    <input 
                    className='form-control'
                    value={this.state.address}
                    onChange={this._handleInputChange}
                    />
                    <button
                    onClick={this._addOffice}
                    >
                    Confirm address
                    </button>
                </div>
                <div>
                    {this.state.offices.map(office => 
                    <p>
                        <span 
                        style={{ marginRight: 15 }}
                        onClick={this._removeOffice(office.address)}
                        className='glyphicon glyphicon-remove'
                        />
                        {office.address}
                    </p>
                    )}
                </div>
            </div>
        )
    }
}