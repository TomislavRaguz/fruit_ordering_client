import React,{ Component } from 'react';

import API from '../../API';
import { PageHeader, OrderCard } from '../../components';

class CustomerOrdersPage extends Component{
    render(){
        const { orderList } = this.props.data;
        return(
            <div className='container' style={{ marginBottom: 20 }}>
                <PageHeader title='My Orders' />
                {orderList.map(order => 
                    <OrderCard 
                        key={order.id} 
                        order={order} 
                    />
                )}
            </div>
        )
    }
}

export default API.container(props => `
query orders{
	orderList(sessionScope:true){
    id
    expectedTime
    officeId
    statusId
    approved
    status{
      id
      label
    }
    office{
      id
      userId
      address
    }
    fruitCart{
        total
        orderFruitList{
          orderId
          quantity
          label
          pricePerUnit
        }
    }
  }

}
`,CustomerOrdersPage)

