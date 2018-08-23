import React from 'react';
import './PageHeader.css'

const PageHeader = props =>
<div className='row page-header-container'>
    <h1>{props.title}</h1>
</div>

export default PageHeader;