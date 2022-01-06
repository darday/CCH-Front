import { types } from "../types/types";

const initialState={
    loading:false
}

export const uiReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.uiStartLogin:
            return{
                loading:action.payload.loading,
            }
        case types.uiFinishLogin:
            return{
                initialState
            }
        
    
        default:
            return initialState
    }
}