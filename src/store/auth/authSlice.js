import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    status:'not-authenticated',//not-authenticated , authenticated
    accessToken:null,
    uid:null,
    email:null,
    displayName:null,
    img:null,
    rol:null,
    errorMessage:null,
  },
  reducers: {
    login:(state,{payload})=>{
      // console.log(payload);
      state.status='authenticated';//not-authenticated , authenticated
      // state.accessToken=payload.accessToken;
      state.uid=payload.id;
      state.email=payload.email;
      state.displayName=payload.name +' '+ payload.last_name;
      state.img=payload.img;
      state.rol=payload.rol;
      state.errorMessage=null;
    },
    logout:(state,payload)=>{
      state.status='not-authenticated';//not-authenticated , authenticated
      state.accessToken=null;
      state.uid=null;
      state.email=null;
      state.displayName=null;
      state.img=null;
      state.errorMessage=payload.payload.message;
    },
    checkingCredentials:(state)=>{
      state.status='checking';
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer




