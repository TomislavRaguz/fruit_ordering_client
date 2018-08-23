import React from 'react';
import './DetailedCustomerSection.css'

const DetailedCustomerView = ({ customer }) =>
<div>
    <div className='detailed-customer-section__title-div'>
        <h1>{customer.label}</h1>
        <p><span className='glyphicon glyphicon-envelope'/> : {customer.email}</p>
        <p><span className='glyphicon glyphicon-phone'/> : {customer.phone}</p>
    </div>
    <p className='.detailed-customer-section__offices-label'>Offices:</p>
    {customer.officeList &&
     customer.officeList.map(office =>
        <p key={office.id}>{office.address}</p>
     )}
</div>

export default DetailedCustomerView;