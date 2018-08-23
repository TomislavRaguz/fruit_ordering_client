import React,{ Component } from 'react';
import { connect } from 'react-redux';

import API from '../../API';
import { PageHeader, DetailedCustomerSection } from '../../components';

class CustomerOfficesPage extends Component{

    render(){
        const { customer } = this.props.data;
        return(
            <div className='container'>
                <PageHeader title='My profile' />
                {customer && <DetailedCustomerSection customer={customer} />}
                <p>To register more offices, contact us with the details at
                    <a href='mailto:frooto@outlook.com' style={{ color:'blue' }}> frooto@outlook.com </a> 
                     or call us at 
                    <a href="tel:+0911527074" style={{ color:'blue' }}> 0911527074</a>
                    .
                </p>
            </div>
        )
    }
}

const CustomerOfficesPageContainer = API.container(props =>`
query clients{
    customer(id:${props.userState.user.id}){
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
`, CustomerOfficesPage)

export default connect(
    store => ({ userState: store.userState })
)(CustomerOfficesPageContainer);

