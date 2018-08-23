import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { PageHeader } from '../../components';
import API from '../../API';

class AdminNewFruitPage extends Component{
    state = {
        label: '',
        pricePerUnit: ''
    }

    _handleInputChange = inputKey => e => {
        this.setState({ [inputKey]: e.target.value })
    }

    _submit = () => {
        const err = this._validate(this.state);
        if(err){
            alert(err);
        } else {
            const { label, pricePerUnit } = this.state;
            API.query(`
            mutation createFruit{
                createFruit(input:{
                  label:"${label}",
                  pricePerUnit: ${pricePerUnit}
                }){
                  id
                  label
                  pricePerUnit
                }
              }
            `).then(res => {
                if(res.errors){
                    alert(res.errors)
                } else if (res.data){
                    alert('Fruit succesfuly added.')
                    this.props.history.push('/admin/fruits')
                }
            })
        }
    }

    _validate = fields => {
        const { label, pricePerUnit } = this.state;
        if(!label){
            return 'Please provide a label'
        }
        if(!pricePerUnit){
            return 'Please enter a price'
        }
    }

    render(){
        return(
            <div className='container' style={{ marginTop: 60 }}>
                <PageHeader title='New Fruit'/>

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='new-fruit-label'>Label:</label>
                        <input 
                            className='form-control'
                            id='new-fruit-label'
                            value={this.state.label}
                            onChange={this._handleInputChange('label')}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='form-group'>
                        <label htmlFor='new-fruit-price'>Price(in cents):</label>
                        <input 
                            className='form-control'
                            id='new-fruit-price'
                            value={this.state.pricePerUnit}
                            onChange={this._handleInputChange('pricePerUnit')}
                        />
                    </div>
                </div>

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

export default withRouter(AdminNewFruitPage);