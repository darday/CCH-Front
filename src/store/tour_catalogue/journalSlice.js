import { createSlice } from '@reduxjs/toolkit'; 
export const journalSlice = createSlice({ 
    name: 'journal', 
    initialState: { 
        isSaving: false,
        messageSaved:'',
        tours:[],

    }, 
    reducers: { 
        addTourToCatalogue: (state,action)=>{
            state.tours.push(action.payload);
            state.isSaving=false;
        },

        setTourFromCatalogue:(state,action)=>{

        },

        updateTourFromCatalogue:(state,action)=>{

        },
        deleteTourFromCatalogue:(state,action)=>{
            
        }
    } 
}); 

// Action creators are generated for each case reducer function
export const { addTourToCatalogue,setTourFromCatalogue } = journalSlice.actions; 
export default journalSlice.reducer
