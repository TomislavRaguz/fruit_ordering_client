import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import API from '../../API'
import "./AdminClients.css"
import { PageHeader } from '../../components';

class AdminClientsPage extends Component{
    render(){
        const { customerList } = this.props.data;
        return(
            <div className='container' style={{ paddingTop: 50 }}>
                <PageHeader title='Clients'/>
                <div>
                    <Link to='/admin/new-client'>
                        <button 
                            className='btn btn-success' 
                            style={{ marginTop: 5 }}
                        >
                        + Add a client
                        </button>
                    </Link>
                </div>
                {customerList.map(customer =>
                    <ClientListItem customer={customer} key={customer.id} />
                )}
            </div>
        )
    }
}

const ClientListItem = ({ customer }) =>
<Link to={'/admin/client/'+customer.id}>
    <div className='customer-list-item'>
        <p className='customer-list-item__title'>{customer.label}</p>
        <p><span className='glyphicon glyphicon-envelope'/> : {customer.email}</p>
        <p><span className='glyphicon glyphicon-phone'/> : {customer.phone}</p>
    </div>
</Link>

export default API.container(props =>`
query clients{
    customerList{
      id  
      label
      email
      phone
    }
  }
`, AdminClientsPage);