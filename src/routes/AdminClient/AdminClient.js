import React, { Component } from 'react';

import API from '../../API'
import './AdminClient.css'
import { DetailedCustomerSection } from '../../components'

class AdminClientPage extends Component{
    state = {
        customer: null,
        newOfficeAddress: ''
    }

    componentDidMount(){
        this._fetchClient();
    }

    _fetchClient = async() => {
        const res = await API.query(`
        query clients{
            customer(id:${this.props.match.params.clientId}){
              id  
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
        `)
        this.setState({ customer: res.data.customer })
    }

    _addOffice = () => {
        const { newOfficeAddress, customer } = this.state;
        if(newOfficeAddress){
            customer.officeList.push({ id: Math.random(), address: newOfficeAddress })
            this.setState({ customer: { ...customer}, newOfficeAddress:'' })
            API.query(`
            mutation createOffice{
                createOffice(input:{
                  userId: ${this.state.customer.id},
                  address: "${newOfficeAddress}"
                }){
                  id
                  userId
                  address
                }
              }
            `)
        }
    }

    render(){
        const { customer } = this.state;
        if(!customer){
            return null;
        }
        return(
            <div className='container'>
                <DetailedCustomerSection customer={customer}/>
                <div className='form-group'>
                    <label htmlFor='new-office-address'>New office address:</label>
                    <input 
                      id='new-office-address'
                      className='form-control'
                      value={this.state.newOfficeAddress}
                      onChange={e => { this.setState({ newOfficeAddress: e.target.value }) }}
                    />
                    <button className='btn btn-success' style={{ marginTop: 5 }}
                    onClick={this._addOffice}
                    >Add new office</button>
                </div>
                <a className='btn btn-success' href={'http://localhost:8080/admin/user-report/'+customer.id}>Export sales to excel</a>
            </div>
        )
    }
}

export default AdminClientPage;

