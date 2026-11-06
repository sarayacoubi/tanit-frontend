import {HANDELEERROR, CLEARERROR} from '../ActionsTypes/ErrorsTypes';

const initailState =[]



const ErrorsReducer =(state =initailState , action)=>{

 switch(action.type){

case HANDELEERROR : return [...state, action.payload]

case CLEARERROR : return state.filter((el)=> el.id !== action.payload)
    default: return state;
 }


}

export default ErrorsReducer;