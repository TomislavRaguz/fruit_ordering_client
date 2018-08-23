import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Datetime from 'react-datetime';

import API from '../../API';
import { PageHeader } from '../../components'

class NewOrderPage extends Component{
    state = {
        customer: null,
        fruitList: null,
        selectedOffice: null,
        selectedFruit: null,
        orderFruitList: []
    }

    componentDidMount(){
        this._fetchData()
    }

    _fetchData = () => {
        API.query(`
        query newOrderScreen{
            fruitList{
              id
              label
              pricePerUnit
            }
            customer(id:${this.props.userState.user.id}){
              officeList{
                id
                userId
                address
              }
            }
          }
        `).then(res =>{
            if(res.errors){
                alert(res.errors)
            } else {
                const { customer, fruitList } = res.data;
                customer.officeList.forEach(office => {
                    office.label = office.address;
                });
                this.setState({ customer, fruitList })
            }
        })
    }

    _addFruit = () =>{
        const { selectedFruit, orderFruitList, fruitList } = this.state;
        if(selectedFruit){
            this.setState({ 
                orderFruitList: [...orderFruitList, { ...selectedFruit, fruitId: selectedFruit.id, quantity:1 } ],
                selectedFruit: null,
                fruitList: fruitList.filter(fruit => fruit.id !== selectedFruit.id)
            })
        }
    }

    _removeFruit = fruitId => () => {
        const {  orderFruitList, fruitList } = this.state;
        const fruit = orderFruitList.find(orderFruit => orderFruit.id === fruitId);
        this.setState({
            orderFruitList: orderFruitList.filter(orderFruit => orderFruit.id !== fruitId),
            fruitList: [...fruitList, fruit]
        })
    }

    _orderFruitQuantityChange = fruitId => e =>{
        const { orderFruitList } = this.state;
        const fruitIndex = orderFruitList.findIndex(orderFruit => orderFruit.id === fruitId);
        orderFruitList[fruitIndex].quantity = e.target.value;
        this.setState({
            orderFruitList: [...orderFruitList]
        })
    }

    _submit = () => {
        const err = this._validate(this.state);
        if(err){
            alert(err)
        } else {
            const { selectedOffice, orderFruitList } = this.state;
            const expectedTimeMoment = this.datetime.state.selectedDate;
            console.log(selectedOffice)
            API.query(`
            mutation createOrder{
                createOrder(input:{
                  officeId:${selectedOffice.id},
                  expectedTime:"${expectedTimeMoment.format("YYYY-MM-DD HH:mm:ss")}",
                  fruits:[
                      ${orderFruitList.map(orderFruit => `{fruitId:${orderFruit.id}, quantity:${orderFruit.quantity}}`)}
                    ]
                }){
                  id
                }
              }
            `).then(res => {
                if(res.errors){
                    console.log(res.errors);
                    alert(res.errors);
                } else {
                    alert('Order successfuly created!')
                    this.props.history.push('/my-orders')
                }
            })
            
        }
    }

    _validate = fields =>{
        const { selectedOffice, orderFruitList } = fields;
        if(!selectedOffice){
            return 'Please select an office.'
        }
        if(orderFruitList.length === 0){
            return 'No fruit in the basket.'
        }
        if(!this.datetime.state.selectedDate){
            return 'Please set a delivery time.'
        }
    }

    render(){
        const { customer, fruitList, selectedFruit, selectedOffice, orderFruitList } = this.state;
        if(!customer){
            return(
                <div className='container'>
                    <PageHeader title='New Order' />
                </div>
            )
        }
        
        return (
            <div className='container'>
                <PageHeader title='New Order' />

                <div className='row'>
                    <div className='col-xs-12'>
                        <label htmlFor='order-office-select'>Office to deliver to:</label>
                        <Select 
                            name='order-office-select'
                            value={selectedOffice}
                            onChange={selectedOffice => this.setState({ selectedOffice })}
                            options={customer.officeList}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xs-12' style={{ paddingTop: 15 }}>
                        <label>Expected delivery time:</label>
                        <Datetime 
                            isValidDate={currentDate => {
                                const diff = currentDate.fromNow()
                                if(diff.substr(diff.length -3 )==='ago'){
                                    return false
                                }
                                return true;
                            }}
                            ref={ref => this.datetime = ref}
                        />
                    </div>
                </div>

                <div style={{ padding:15, backgroundColor: 'lightgray', marginTop: 15, borderRadius: 5 }}>
                    <div style={{ borderBottom:'1px solid gray', marginBottom: 15 }}>
                        <p style={{ textIndent: 15, fontWeight: 'bold', fontSize:18 }}>Fruit basket</p>
                    </div>

                    <div className='row'>
                        <div className='col-sm-8'>
                            <label htmlFor='order-fruit-select'>Select a fruit:</label>
                            <Select 
                                name='order-fruit-select'
                                value={selectedFruit}
                                onChange={selectedFruit => this.setState({ selectedFruit })}
                                options={fruitList}
                            />
                        </div>
                        <div className='col-sm-4' style={{ marginTop: 28 }}>
                            <button
                            style={{  width: '100%' }} 
                            className='btn btn-success'
                            onClick={this._addFruit}
                            >ADD</button>
                        </div> 
                    </div>

                    {!!orderFruitList.length &&
                        <div className='row' style={{ padding: 15, borderBottom:'1px solid black' }}>
                            <b>Fruit</b>
                            <div 
                                className='pull-right'
                                style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                <b>Subtotal</b>
                            </div>
                            <div 
                                className='pull-right'
                                style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                <b>$/unit</b>
                            </div>
                            <div 
                                className='pull-right'
                                style={{ display:'inline-block', width: 80, textAlign:'center' }}>
                                <b>Quantity</b>
                            </div>
                        </div>
                    }

                    <div className='row'>
                        {orderFruitList.map(orderFruit => 
                            <div className='col-xs-12' key={orderFruit.id}>
                                <div style={{ borderBottom: '1px solid black', height: 54, paddingTop: 20 }}>
                                    <span style={{ fontWeight:'bold'}}>{orderFruit.label}</span>
            
                                    <div 
                                        className='pull-right'
                                        style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                        <span>{(orderFruit.pricePerUnit*orderFruit.quantity/100).toFixed(2)} $</span>
                                    </div>
                                    <div 
                                        className='pull-right'
                                        style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                        <span>{(orderFruit.pricePerUnit/100).toFixed(2)} $</span>
                                    </div>
                                    <input 
                                        style={{ width: 80, position:'relative', bottom: 6 }}
                                        className='pull-right'
                                        type='number' 
                                        min={1}
                                        value={orderFruit.quantity}
                                        onChange={this._orderFruitQuantityChange(orderFruit.id)}
                                    />
                                    <div 
                                        className='pull-right'
                                        style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                        <span 
                                        className='glyphicon glyphicon-remove'
                                        onClick={this._removeFruit(orderFruit.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {!!orderFruitList.length &&
                        <div className='row' style={{paddingTop: 15, paddingRight: 15}}>
                            <div 
                                className='pull-right'
                                style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                <b>
                                    {(orderFruitList.reduce(
                                        (totalPrice, orderFruit) => totalPrice + orderFruit.pricePerUnit * orderFruit.quantity,
                                        0
                                    )/100).toFixed(2)} $
                                </b>
                            </div>
                            <div 
                                className='pull-right'
                                style={{ display:'inline-block', width: 100, textAlign:'center' }}>
                                <span>TOTAL</span>
                            </div>
                        </div>
                    }


                    

                </div>

                <button 
                    className='btn btn-success form-button'
                    onClick={this._submit}
                >
                ORDER
                </button>
                
            </div>
        )
        
    }
}

export default connect(store => ({ userState: store.userState }))(NewOrderPage);