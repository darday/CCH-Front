import axios from "axios";
import { toast } from "react-toastify";
import { ApiUrl } from "../../services/ApiRest";
import { addTourToMonthly,statusSave } from "./monthlySlice";

export const startNewTourToMonthly = (f) =>{
    return  async(dispatch,getState)=>{
        dispatch(statusSave(true));          

        await axios.post(ApiUrl+'monthly-tour-add',f)  
        .then(response=>{
            var resp=response.data;
            dispatch(statusSave(false));          

            console.log(resp);
            if(resp.success){
                toast.success("Tour Agregado exitosamente", {position: toast.POSITION.BOTTOM_RIGHT}); 
                dispatch(statusSave(false));          
                dispatch(addTourToMonthly(resp.data));          

            }else{
                toast.error("El tour no se ha agregado", {position: toast.POSITION.BOTTOM_RIGHT}); 
                dispatch(statusSave(false));          
          
            }
        }) 
        .catch(e =>{
            console.log(e)
            toast.error(""+e+"  !", {position: toast.POSITION.BOTTOM_RIGHT});           
            dispatch(statusSave(false));          

        })    

    }

}