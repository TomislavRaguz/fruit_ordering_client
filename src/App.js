import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navigation } from './components';
import { 
  Home, LoginPage, 
  NewOrderPage, CustomerOrdersPage, CustomerProfilePage,  
  AdminClientsPage, AdminFruitsPage, AdminOrdersPage, AdminClientPage, 
  AdminNewClientPage, AdminNewFruitPage
} from './routes';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/new-order' component={NewOrderPage} />
          <Route exact path='/my-orders' component={CustomerOrdersPage} />
          <Route exact path='/my-profile' component={CustomerProfilePage} />
          <Route exact path='/admin/fruits' component={AdminFruitsPage}/>
          <Route exact path='/admin/new-fruit' component={AdminNewFruitPage}/>
          <Route exact path='/admin/clients' component={AdminClientsPage}/>
          <Route exact path='/admin/client/:clientId' component={AdminClientPage} />
          <Route exact path='/admin/new-client' component={AdminNewClientPage} />
          <Route exact path='/admin/orders' component={AdminOrdersPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
