
import {GETALLORDERS, GETONEORDER, EDITORDERSTATUS,ADDORDER } from '../ActionsTypes/OrdersTypes';

const initialState = {
    orders: [],
    order:{},
    errors: [],
}



const OrdersReducer = (state =initialState , action)=>{

switch(action.type){

case GETALLORDERS : return {...state, orders: action.payload,errors: [] }

case GETONEORDER: return {...state, order : action.payload, errors: []}

case EDITORDERSTATUS :return {...state, order: action.payload, errors: []}
 case ADDORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        order: action.payload,
        errors: [],
      };

    default: return  state;
}


}

export default OrdersReducer