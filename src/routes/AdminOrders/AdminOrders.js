import React,{ Component } from 'react';
import { connect } from 'react-redux';

import API from '../../API';
import { PageHeader, OrderCard } from '../../components';

class AdminOrdersPage extends Component{
    componentDidMount(){
        const { orderState } = this.props;
        if(!orderState.loading && !orderState.orderList){
            this.props.dispatch({
                type: 'ORDER_FETCH'
            })
        }
    }

    render(){

        const { orderState } = this.props;
        if(orderState.loading){
            return <p>loading...</p>
        }
        const { orderList, orderStatusList } = orderState;
        if(!orderList){ return null }
    
        return(
            <div className='container'>
                <PageHeader title='New Orders' />
                {orderList.map(order => 
                    <OrderCard 
                        key={order.id} 
                        order={order}
                        orderStatusList={orderStatusList}
                        dispatch={this.props.dispatch}
                    />
                )}
            </div>
        )
    }
}

export default connect(store =>({orderState: store.orderState}))(AdminOrdersPage);