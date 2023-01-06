import { createSlice } from '@reduxjs/toolkit'; 
export const monthlySlice = createSlice({ 
    name: 'monthly', 
    initialState: { 
        isSaving: false,
        messageSaved:'',
        tours:[],
    }, 
    reducers: { 
        addTourToMonthly: (state,  action  ) => { 
            state.tours.push(action.payload);
            state.isSaving=false;        
        }, 
        setTourFromMonthly:(state,action)=>{

        },

        updateTourFromMonthly:(state,action)=>{

        },
        deleteTourFromMonthly:(state,action)=>{
            
        }
    } 
}); 

// Action creators are generated for each case reducer function
export const { addTourToMonthly } = monthlySlice.actions; 
export default monthlySlice.reducer
