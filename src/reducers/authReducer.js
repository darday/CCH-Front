import { types } from "../types/types";

export const authReducer =(state = {}, action)=>{
    switch (action.type) {
        case types.login:
            return{
                uid:action.payload.uid,   
                token:action.payload.token            
            }
        case types.register:
            return{
                uid:action.payload.uid,
                data:action.payload.data,
            }
        case types.logout:
            return{}
            
    
        default:
            return state;
    }
}