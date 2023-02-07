import { createSlice } from '@reduxjs/toolkit'; 
export const journalSlice = createSlice({ 
    name: 'journal', 
    initialState: { 
        isLoading: false,
        messageSaved:'',
        tours:[],

    }, 
    reducers: { 
        addTourToCatalogue: (state,action)=>{
            state.tours.push(action.payload);
        },

        statusSave:(state,action)=>{
            state.isLoading=action.payload;
            console.log('aqui llegue ')
            console.log(state)
            console.log(action)
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
export const { addTourToCatalogue,setTourFromCatalogue,statusSave } = journalSlice.actions; 
export default journalSlice.reducer
