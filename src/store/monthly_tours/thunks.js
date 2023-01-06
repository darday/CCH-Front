import axios from "axios";
import { toast } from "react-toastify";
import { ApiUrl } from "../../services/ApiRest";
import { addTourToMonthly } from "./monthlySlice";

export const startNewTourToMonthly = (f) =>{
    return  async(dispatch,getState)=>{
        
        await axios.post(ApiUrl+'monthly-tour-add',f)  
        .then(response=>{
            var resp=response.data;
            console.log(resp);
            if(resp.success){
                toast.success("Tour Agregado exitosamente", {position: toast.POSITION.BOTTOM_RIGHT}); 
                dispatch(addTourToMonthly(resp.data));          
            }else{
                toast.error("El tour no se ha agregado", {position: toast.POSITION.BOTTOM_RIGHT});           
            }
        }) 
        .catch(e =>{
            console.log(e)
            toast.error(""+e+"  !", {position: toast.POSITION.BOTTOM_RIGHT});           

        })    

    }

}