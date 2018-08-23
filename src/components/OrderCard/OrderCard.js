import React, { Component } from 'react';
import moment from 'moment';
import Select from 'react-select';

import './OrderCard.css';
import API from '../../API'

class OrderCard extends Component {
    state = {
        orderStatus: this.props.order.status
    }

    _onSelect = orderId => selectedStatus => {
        this.setState({ orderStatus: selectedStatus })
        
        API.query(`
        mutation updateOrderStatus{
            updateOrder(orderId:${orderId},fields:{ statusId:${selectedStatus.id} })
        }
        `)   
    }

    _approveOrder = orderId => () => {
        API.query(`
        mutation updateOrderStatus{
            updateOrder(orderId:${orderId},fields:{ approved:true })
        }
        `)  
       this.props.dispatch({ type:'APPROVE_ORDER', orderId })
    }

    render(){
    const { order, orderStatusList } = this.props;
    const expectedTimeMoment = moment(order.expectedTime);
    return (
        <div className='detailed-order-card' style={{ marginBottom: 20 }}>
            <p>Order number: {order.id}</p>
            <p>Approved: {order.approved ? 'true' : 'false' }</p>
            <p>Expected Time: {expectedTimeMoment.format('DD-MM-YYYY HH:mm')} ({expectedTimeMoment.fromNow()})</p> 
            {orderStatusList ?
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <label>Status:</label>
                    <Select 
                        value={this.state.orderStatus}
                        options={orderStatusList}
                        onChange={this._onSelect(order.id)}
                    />
                </div>
                : <p>Status: {order.status.label}</p>
            }
            
            <p>Office: {order.office.address}</p>
            <p>Total: {(order.fruitCart.total/100).toFixed(2)} $</p>
            <div>
                <p>Fruits:</p>
                {order.fruitCart.orderFruitList.map(orderFruit=>
                    <p>{orderFruit.quantity} {orderFruit.label}</p>
                )}
            </div>
            {(!order.approved && orderStatusList) &&
                <div className='row'>
                    <button 
                        style={{ marginRight: 15 }} 
                        className='btn btn-success pull-right'
                        onClick={this._approveOrder(order.id)}
                    >
                        APPROVE
                    </button>
                </div>
            }
            
        </div>)
    }
}


export default OrderCard;