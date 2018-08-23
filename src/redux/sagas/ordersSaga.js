import { call, put, takeLatest } from 'redux-saga/effects'
import API from '../../API';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getOrders(action) {
   try {
    const res = yield call([API,"query"], `query orders{
        orderList{
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
        orderStatusList{
            id
            label
        }
    }`);

    yield put({
        type: 'ORDER_FETCH_SUCCESS', 
        orderList: res.data.orderList,
        orderStatusList: res.data.orderStatusList
    });
   } catch (e) {
      yield put({type: 'ORDER_FETCH_FAILURE', message: e.message});
   }
}

function* ordersSaga() {
  yield takeLatest('ORDER_FETCH', getOrders);
}

export default ordersSaga;

