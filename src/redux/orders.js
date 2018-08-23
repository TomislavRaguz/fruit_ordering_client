export default (state={ loading: false, orderList:null, orderStatusList:null },action)=>{
    
    switch(action.type){
        case 'ORDER_FETCH':
            return {
                loading: true,
                orderList: null,
                orderStatusList: null
            }
        case 'ORDER_FETCH_SUCCESS':
            return {
                loading: false,
                orderList: action.orderList,
                orderStatusList: action.orderStatusList
            }
        case 'ORDER_FETCH_FAILURE':
            return {
                loading: false,
                orderList: null,
                orderStatusList: null
            }    
        case 'APPROVE_ORDER':
            const { orderList } = state;
            const approvedOrderIndex = orderList.findIndex(order => order.id === action.orderId)
            orderList[approvedOrderIndex].approved = true; 
            return {
                loading: false,
                orderList: [...orderList],
                orderStatusList: state.orderStatusList
            }
        case 'LOGOUT':
            return {
                loading: false,
                orders: null
            }
        default:
            return state
    }
}