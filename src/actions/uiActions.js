import { types } from "../types/types"


export const uiStartLogin=()=>{
    return{
        type:types.uiStartLogin,
        payload:{
            loading:true,
        }
    }
}

export const  uiFinishLogin=()=>{
    return{
        type:types.uiFinishLogin,
        payload:{
            loading:false,

        }
    }
}