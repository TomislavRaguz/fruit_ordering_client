import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import './AdminFruits.css';
import API from '../../API';
import { PageHeader } from '../../components';

class AdminFruitsPage extends Component{

    render(){
        const { fruitList } = this.props.data;
        return(
            <div className='container'>
                <PageHeader title='Fruits'/>
                <div>
                    <Link to='/admin/new-fruit'>
                        <button 
                            className='btn btn-success' 
                            style={{ marginTop: 5 }}
                        >
                        + Add a fruit
                        </button>
                    </Link>
                </div>
                {fruitList.map(fruit => 
                   <FruitListItem key={fruit.id} {...fruit} />
                )}
            </div>
        )
    }
}

const FruitListItem = props => 
<div className='fruit-list-item'>
    <p className='fruit-list-item__label'>{props.label}</p>
    <p>Price per unit: {(props.pricePerUnit/100).toFixed(2)} $</p>
</div>

export default API.container(props => `
query Fruits{
    fruitList{
    id
    label
    pricePerUnit
  }
}
`, AdminFruitsPage)